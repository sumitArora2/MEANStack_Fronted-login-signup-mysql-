import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../authentication.service'
import * as html2pdf from 'html2pdf.js';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: any

  constructor(private auth: AuthenticationService,private toaster:Toaster) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }
  downloadProfile(){
   const options={
     filename:'profile.pdf',
     image:{type:'jpeg'},
     html2canvas:{},
     jspdf:{orientation:'landscape'}
   }
   const content:Element=document.getElementById('element-to-export');
   html2pdf().from(content).set(options).save();
  }
  deleteAccount(){
  this.auth.deleteProfile(this.details._id).subscribe(data=>{
    this.auth.logout();
    this.toaster.open({
      text: "Your Profile deleted successfully",
      type: 'danger',
    });
  },err=>{

  })  
  }
}
