import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { WebSocketService } from 'src/app/services/socket.service';
import { AuthState } from 'src/app/state/reducer/auth.reducer';
import { AuthenticationService } from '../../services/authentication.service';
import { UserStoreService } from '../../services/user.service';
import { CourseState } from '../../state/reducer/cart.reducer';

interface AppState
{
  course:CourseState
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[]
})
export class NavbarComponent implements OnInit {
  
  @Input() apptitle:string="";
  CourseList?:Observable<CourseState>;
  isclicked:boolean = false;
  $user = new BehaviorSubject<any>({});
  token = new BehaviorSubject<string>("");
  count = new BehaviorSubject<number>(0);

  constructor(private _store : Store<AppState>, public auth:AuthenticationService, 
   private user:UserStoreService,
   private _authstore : Store<{auth:AuthState}>
   ) {}

  ngOnInit(): void {
      
    this.user.userinfo$.subscribe(data=>{
      this.$user.next(data);
    })

    this._authstore.select('auth').subscribe(val=>{
      this.token.next(val.token);
    })

    this._store.select('course').subscribe((value)=>{
      console.log(value);
      this.count.next(value.courseList.length);
    })

  }


  click()
  {
    this.isclicked = !this.isclicked;
  }

  logout()
  {
    this.auth.signOut();
    this.isclicked = false;
  }

}
