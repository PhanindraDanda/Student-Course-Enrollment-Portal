import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import * as actions from '../action/cart.action'

@Injectable()
export class CartEffects {
    constructor(private actions$:Actions, private cartService:CartService) { }

   
   getItems$ = createEffect(()=>
   this.actions$.pipe(
    ofType(actions.GetCourse),
    mergeMap(
        ()=> this.cartService.getCartItems()
        .pipe(
                    map((response)=>{
                        console.log(response)
                        return actions.GetCourseSuccess({course:response})
                    }),
                    catchError(error => of(actions.GetCourseFailure({error:error})))
                )
        )
    )

    )

   addItem$ = createEffect(()=>
   this.actions$.pipe(
    ofType(actions.AddCourse),
    mergeMap(
        (data)=>this.cartService.addToCart({"productid":data?.course?.id})
        .pipe(
            map(() => actions.AddCourseSuccess({course:data})),
            catchError(error => of(actions.AddCourseFailure(error)))
        ),
    )
   ))

   RemoveItem$ = createEffect(()=>
   this.actions$.pipe(
    ofType(actions.RemoveCourse),
    mergeMap(
        (data)=>this.cartService.RemoveCart({"productid":data?.course?.id})
        .pipe(
            map(() => actions.RemoveCourseSuccess({course:data,action:false})),
            catchError(error => of(actions.RemoveCourseFailure(error)))
        ),
    )
   ))
}