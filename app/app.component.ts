import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AddToken } from './state/action/auth.action';
import { GetCourse } from './state/action/cart.action';
import { GetLearnings } from './state/action/course.action';
import { GetCourses } from './state/action/home.action';
import { AuthState } from './state/reducer/auth.reducer';
import { CourseState } from './state/reducer/cart.reducer';
import { LearningState } from './state/reducer/course.reducer';
import { HomeState } from './state/reducer/home.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Glimpse';

  constructor(private cookie:CookieService, 
    private _authStore: Store<{auth:AuthState}>,
    private _store : Store<{course:CourseState}>,
    private _homeStore:Store<{home:HomeState}>,
    private _learningStore:Store<{learning:LearningState}>,
    private _route : Router
    )
  {
    const token = this.cookie.get('token');
    const checkout_id = sessionStorage.getItem('checkout_id');

    this._authStore.dispatch(AddToken({token:token}));

    this._authStore.select('auth').subscribe((val)=>{
      if(val.token !== "")
      {
        this._store.dispatch(GetCourse())
      }
      if(val.token !== "" && checkout_id ==null)
      {
        this._learningStore.dispatch(GetLearnings())
      }
    })
    
    console.log(this._route.getCurrentNavigation());
   

    
    this._homeStore.dispatch(GetCourses());   
  }

  ngOnInit()
  {
   
  }
}
