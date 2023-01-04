import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseInterface } from '../components/course/course.interface';
import { AuthState } from '../state/reducer/auth.reducer';


@Injectable({providedIn: 'root'})
export class MyCourseService{
    
     
    constructor(private _http:HttpClient,private _authStore:Store<{auth:AuthState}>) { 
    }
    getCourse():Observable<CourseInterface[]>
    {
       return this._http.get<CourseInterface[]>(`${environment.apiUrl}/user/courses`)
    }

}