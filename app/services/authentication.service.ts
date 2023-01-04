import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { lastValueFrom, Observable} from 'rxjs';
import firebase from 'firebase/compat/app';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthState } from '../state/reducer/auth.reducer';
import { AddToken, deleteToken} from '../state/action/auth.action';
import { CourseState } from '../state/reducer/cart.reducer';
import { ClearCart } from '../state/action/cart.action';
import { HomeState } from '../state/reducer/home.reducer';
import { GetCourses } from '../state/action/home.action';

@Injectable({providedIn: 'root'})
export class AuthenticationService{

    $user = new Observable<any>();

    @BlockUI() blockUI?: NgBlockUI;
    constructor(private auth:AngularFireAuth, 
        private router:Router,
        private _http:HttpClient,
        private _authStore:Store<{auth:AuthState}>,
        private _cartStore:Store<{course:CourseState}>,
        private _homeStore:Store<{home:HomeState}>,
        ) { 
    }

    async signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        await this.auth.signInWithPopup(provider)
        .then(async (user)=>{
            return await user.user?.getIdToken();
        })
        .then(async(token:any)=>{
            await this.auth.signOut();
            return token;
        })
        .then(async (token:any)=>{
             return await lastValueFrom(this._http.post(`${environment.apiUrl}/authenticate`,{token:token}));
        })
        .then((data:any)=>{
            this._authStore.dispatch(AddToken({token:data?.token}));
        })
        .then(async ()=>{
            const service = ()=> this.router.navigateByUrl('/home');
            this.DisplayStatus("Logging In...",service);
        })
        .catch(err=>{
         console.log(err);
        })
    }

    async signOut()
    {
        await lastValueFrom(this._http.get(`${environment.apiUrl}/user/logout`))
        .then(()=>{
            this._authStore.dispatch(deleteToken());
            this._cartStore.dispatch(ClearCart());
            this._homeStore.dispatch(GetCourses());
            const service = ()=> this.router.navigateByUrl('/home');
            this.DisplayStatus("Signing Out...",service);
        })
        .catch(err=>{
            console.log(err);
        })
   }

    DisplayStatus(message:string, service:any)
    {
      this.blockUI?.start(message);
        setTimeout(()=>{
          this.blockUI?.stop();
          service()
        },2000)
  
    }
    
}