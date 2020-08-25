import { Component, OnInit } from '@angular/core';
import { CollegeService } from '../college.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  colleges:any
  college_name:any='';
  constructor(private collegeService:CollegeService){

  }
  ngOnInit(){
    this.getColleges()
  }
  // AddCollege(){
  //   console.log(this.college_name);
  //   let data={'college_name':this.college_name};
  //   this.collegeService.addColleges(data).subscribe((data)=>{
  //    if(data){
  //     this.getColleges();
  //    }
  //   },err=>{
  //     console.log("err is",err)
  //   })
  // }
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
}
