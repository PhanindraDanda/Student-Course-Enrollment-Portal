import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { MyCourseService } from 'src/app/services/mycourses.service';
import * as actions from '../action/course.action'
import { updateCourseStatus } from '../action/home.action';
import { HomeState } from '../reducer/home.reducer';

@Injectable()
export class LearningEffects {
    constructor(private actions$:Actions, private course:MyCourseService,
        private _homeStore:Store<{home:HomeState}>
        ) { }

   
   getItems$ = createEffect(()=>
   this.actions$.pipe(
    ofType(actions.GetLearnings),
    mergeMap(
        ()=> this.course.getCourse()
        .pipe(
                map((response:any)=>{ 
                    this._homeStore.dispatch(updateCourseStatus({courseList:response}))
                    return actions.AddLearnings({course:response})})
             )
        )
    )

    )

}