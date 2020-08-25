import { Component,OnInit } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'
import { CollegeService } from '../college.service'
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { FormControl, Validators, FormGroup} from '@angular/forms';
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  colleges:any
  signinForm:FormGroup; 
  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    college_name:''
  }

  constructor(private auth: AuthenticationService,
     private router: Router,
     private toaster: Toaster,
     private collegeService:CollegeService
     ) {}
  ngOnInit(){
    this.signinForm = new FormGroup({
      'email' : new FormControl(null,[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),     
      'password' : new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'college_name': new FormControl(null,[Validators.required])
  });
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
  }
  selectCollege(event){
    this.credentials.college_name=event.target.value;
    this.signinForm.value.college_name=event.target.value
    }
  login() {
    console.log("this.signinForm.",this.signinForm)
    console.log(this.signinForm.value);
    if(this.signinForm.valid){
    this.auth.login(this.signinForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toaster.open({
          text: "You Loggedin successfully",
          type: 'success',
        });
        this.router.navigateByUrl('/profile')
      },
      err => {
        console.log(err.error.message);
        this.toaster.open({
          text: err.error.message,
          type: 'danger',
        });
        console.error(err)
      }
    )
  }
}
}
