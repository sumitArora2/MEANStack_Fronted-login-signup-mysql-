import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService,private toaster: Toaster){

  }
}
