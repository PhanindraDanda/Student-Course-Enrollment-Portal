import { Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { HomeState } from 'src/app/state/reducer/home.reducer';
import { AddCourse } from '../../state/action/cart.action';
import { CourseState } from '../../state/reducer/cart.reducer';
import { CourseInterface } from './course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers:[]
})
export class CourseComponent implements OnInit {
  @Input() course?:CourseInterface;
  @Input() isHome?: boolean;
  isButtonClicked = new BehaviorSubject<boolean>(false);
  paymentstatus = new BehaviorSubject<string>("unpaid");

  constructor(
    private _store:Store<{course:CourseState}>,
    private _homestore:Store<{home:HomeState}>
    ) { }


  ngOnInit(): void {
   
    this._store.select('course').subscribe(val=>{
      if(this.course && val.isClicked)
      {
        let isClicked = val.isClicked.get(this.course.id) || false;
        this.isButtonClicked.next(isClicked)
      }
    })

    this._homestore.select('home').subscribe(val=>{
      if(this.course)
      {
        const status = val.status.get(this.course.id) || "";
        this.paymentstatus.next(status)
      }
    })
    
  }

  setValue()
  {

    if(this.course !=undefined)
    {
      console.log(this.course);
      this._store.dispatch(AddCourse({course:this.course}));
    }
  }

}
