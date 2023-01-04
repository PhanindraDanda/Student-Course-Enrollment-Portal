import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import * as actions from '../action/home.action'

@Injectable()
export class HomeEffects {
    constructor(private actions$:Actions, private course:CourseService) { }

   
   getItems$ = createEffect(()=>
   this.actions$.pipe(
    ofType(actions.GetCourses),
    mergeMap(
        ()=> this.course.getAll()
        .pipe(
                    map((response:any)=>actions.AddCourses({course:response})),
                )
        )
    )

    )

}