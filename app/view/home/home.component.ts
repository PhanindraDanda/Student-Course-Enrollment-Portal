import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, } from 'rxjs';
import { CourseInterface } from 'src/app/components/course/course.interface';
import { HomeState } from 'src/app/state/reducer/home.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  title:string = "Glimpse";
  courseList = new BehaviorSubject<CourseInterface[]>([]);
  user:any; 

  constructor(private scroller:ViewportScroller, private _homeStore:Store<{home:HomeState}>) { 

      }

  ngOnInit():void {
    this._homeStore.select('home').subscribe(val=>{
      console.log(val);
      this.courseList.next(val.courseList);
    })
  }

  scroll()
  {
    this.scroller.scrollToAnchor("courseList");
  }
  
}
