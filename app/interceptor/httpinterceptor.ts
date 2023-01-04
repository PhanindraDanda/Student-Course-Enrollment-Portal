import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, from, map, mergeMap, Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private _auth:AuthenticationService, private router:Router, private _snackBar:MatSnackBar) {
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers.set('Content-Type', 'application/json');
        
        return next.handle(req.clone({headers,withCredentials:true}))
        .pipe(
            tap({
                 error : (err:any)=>{
                    if(err.status === 401 || err.status === 403)
                    {
                        this._snackBar.open("UnAuthorized Error", 'Close', {
                            horizontalPosition:'center',
                            verticalPosition: 'bottom',
                            duration:3000,
                            
                          });

                        this._auth.signOut().then(()=>{
                            this.router.navigateByUrl('/home');
                        })
                    }
            
                    if(err.status === 400)
                    {
                        console.log(err)
                        this._snackBar.open(err.error.message, 'Close', {
                            horizontalPosition:'center',
                            verticalPosition: 'bottom',
                            duration:3000,
                            
                          });
                    }
                 }
        })
        )
  }
}