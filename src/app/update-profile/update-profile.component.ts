import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { CollegeService } from '../college.service';
import { AuthenticationService } from '../authentication.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateForm: FormGroup;
  colleges:any
  college_name:any='';
  details:any;
  constructor(private collegeService:CollegeService,
    private authService:AuthenticationService,private toaster:Toaster) { }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      'first_name' : new FormControl('', [Validators.required,Validators.maxLength(25)]),
      'last_name' : new FormControl('',[Validators.required,Validators.maxLength(25)]),
      'email' : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // 'password' : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'college_name': new FormControl('',[Validators.required])
  });
  this.authService.profile().subscribe(
    user => {
      this.details = user
      this.getValues()
    },
    err => {
    });
    this.getColleges();
  }
  getValues(){
    console.log("this.det",this.details);
    this.updateForm.patchValue({
      first_name:this.details.first_name,
      last_name:this.details.last_name,
      email:this.details.email,
      college_name:this.details.college_name
    })
    setTimeout(()=>{
      this.updateForm.controls['college_name'].setValue(this.details.college_name,{onlySelf:true})
    })
  }
  getColleges(){
    this.collegeService.getColleges().subscribe(
      user => {
        this.colleges = user
      },
      err => {
        console.error(err)
      }
    )
  }
  update(){
   console.log("this.updateForm",this.updateForm.value)
   this.authService.updateProfile(this.details._id,this.updateForm.value).subscribe((data)=>{
    console.log(data);
    this.toaster.open({
      text: "Your Profile updated successfully",
      type: 'success',
    });
   },error=>{
     console.log(error);
   })
  }
  selectCollege(event){
    this.updateForm.value.college_name=event.target.value
    }
}
