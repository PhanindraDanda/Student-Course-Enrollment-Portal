import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseInterface } from '../components/course/course.interface';


@Injectable({providedIn: 'root'})
export class CourseService implements Resolve<CourseInterface[]> {

    constructor(private _http:HttpClient) { }

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CourseInterface[] | Observable<CourseInterface[]> | Promise<CourseInterface[]> {
        console.log('resolving course service')
        return this.getAll();
    }

    getAll():Observable<CourseInterface[]>
    {
      return this._http.get<CourseInterface[]>(`${environment.apiUrl}/course/`)
    }

}