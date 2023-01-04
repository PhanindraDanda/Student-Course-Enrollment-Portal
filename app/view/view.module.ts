import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../guards/auth.guard';
import { RouterGuard } from '../guards/route.guard';

import { CourseComponent } from '../components/course/course.component';
import { ViewComponent } from './view.component';
import { CartComponent } from './cart/cart.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { HomeComponent } from './home/home.component';


import { CourseService } from '../services/course.service';
import { LoginComponent } from './login/login.component';
import { MyCourseService } from '../services/mycourses.service';


const routes:Routes = [
    {
        path:'home',
        component: ViewComponent
    },
    {
        path:'cart',
        component:CartComponent
      },
      {
        path:'my-courses',
        component:MyCourseComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'login',
        component:LoginComponent,
        canActivate:[RouterGuard]
      },

];

@NgModule({
    imports: [
       RouterModule.forChild(routes),
       CommonModule
    ],
    exports: [ ],
    declarations: [
        ViewComponent,
        CourseComponent,
        MyCourseComponent,
        CartComponent,
        HomeComponent,
        LoginComponent,

    ],
    providers: [],
})
export class ViewModule { }
