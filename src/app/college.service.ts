import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  apiUrl = 'https://login-mongodb06.herokuapp.com';
  // apiUrl='http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {

  }
  public getColleges(){
    return this.http.get(`${this.apiUrl}/colleges/getColleges`).pipe(map((res: any) => res));
  }
 public addColleges(data){
    console.log("data",data);
    return this.http.post(`${this.apiUrl}/colleges/addCollege`,data).pipe(map((res: any) => res));
  }

}
