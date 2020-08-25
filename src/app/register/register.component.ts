import { Component,OnInit } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";
import { CollegeService } from "../college.service";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { FormControl, Validators, FormGroup} from '@angular/forms';
@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit{
  colleges:any
  signupForm: FormGroup;
  credentials: TokenPayload = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    college_name:""
  };

  constructor(private auth: AuthenticationService,
     private router: Router,
     private collegeService:CollegeService,
     private toaster: Toaster) {}
  ngOnInit(){
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/profile');
     }
    this.collegeService.getColleges().subscribe(
      user => {
        this.colleges = user
      },
      err => {
        console.error(err)
      }
    )
    this.signupForm = new FormGroup({
      'first_name' : new FormControl('', [Validators.required,Validators.maxLength(25)]),
      'last_name' : new FormControl('',[Validators.required,Validators.maxLength(25)]),
      'email' : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password' : new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'college_name': new FormControl('',[Validators.required])
  });
  }
  selectCollege(event){
  this.credentials.college_name=event.target.value;
  this.signupForm.value.college_name=event.target.value
  }
  register() {
    console.log(this.signupForm.value);
    if(this.signupForm.valid){
    this.auth.register(this.signupForm.value).subscribe(
      (data) => {
        if(data){
          this.toaster.open({
            text: "You registered successfully",
            type: 'success',
          });
        }
        this.router.navigateByUrl("/profile");
      },
      err => {
        this.toaster.open({
          text: err.error.message,
          type: 'danger',
        });
        console.error(err);
      }
    );
  }
}
}
