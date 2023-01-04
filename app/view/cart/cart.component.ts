import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { GetCourse, RemoveCourse } from 'src/app/state/action/cart.action';
import { CourseState } from 'src/app/state/reducer/cart.reducer';
import { CourseInterface } from 'src/app/components/course/course.interface';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/state/reducer/auth.reducer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  courses = new BehaviorSubject<CourseInterface[]>([]);
  @BlockUI() blockUI?: NgBlockUI;
  user = new BehaviorSubject<any>("");
  token = new BehaviorSubject<string>("");

  constructor(
    private _store:Store<{course:CourseState}>, 
    private _authstore:Store<{auth:AuthState}>, 
    private _CartService:CartService, 
    private auth:AuthenticationService,
    private router:Router
    ) { }

  ngOnInit(): void {
        
    sessionStorage.removeItem('checkout_id'); // Delets the Existing Checkout

    this._store.select('course').subscribe((item)=>{
      this.courses.next(item.courseList);
    })

    this.auth.$user.subscribe(user=>{
      this.user.next(user);
    });
    
    this._authstore.select('auth').subscribe((val)=>{
      this.token.next(val.token);
      if(val.token !== "" && this.courses.getValue().length == 0)
      {
        this._store.dispatch(GetCourse())
      }
    })  
  }

  getTotal():string
  {
    let total = 0;
    this.courses.getValue().forEach((item:any)=>{
      total+=Number(item?.cost); 
    });
    return total.toFixed(2);
  }

  removeCart(course:CourseInterface)
  {
    this._store.dispatch(RemoveCourse({course:course,action:false}));
  }

  checkout()
  {
   
    if(this.token.getValue().length !== 0){
      const service = ()=>  this._CartService.checkout(this.courses.getValue());
      this.auth.DisplayStatus("Checking Out...",service);
      sessionStorage.setItem('checkout_id',`${uuidv4().toString()}`);
    }
    else{
      const service = ()=> this.router.navigateByUrl('/login');
      sessionStorage.removeItem('checkout_id');
      this.auth.DisplayStatus("Redirecting to Login Page...",service);

    }
  
  }


}
