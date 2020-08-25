import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
// import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { CollegeService } from './college.service';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuardService,CollegeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
