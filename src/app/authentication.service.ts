import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../environments/environment';

export interface UserDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string,
  college_name:string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string,
  college_name:string
}

@Injectable()
export class AuthenticationService {
  private token: string
  apiUrl = 'https://login-mongodb06.herokuapp.com';
  // apiUrl='http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

   removeToken(){
    localStorage.removeItem('usertoken');
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }
  public updateProfile(id,data){
    return this.http.post(`${this.apiUrl}/users/updateProfile/${id}`, data);
  }
  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user)
  }
  public deleteProfile(id): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/deleteProfile`,{id:id})
  }
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`${this.apiUrl}/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
 public getRoles(): Observable<any>{
  return this.http.get(`${this.apiUrl}/users/getRole`);
 }
}
