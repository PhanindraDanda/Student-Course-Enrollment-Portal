import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthState } from '../state/reducer/auth.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
    constructor(private _http: HttpClient, private _router: Router, private _authStore:Store<{auth:AuthState}>) {

      this._authStore.select('auth').subscribe(val=>{
        if(val.token !=="")
        {
            this.addUserInfo();
        }
      })
    }

    private readonly _UserInfo = new BehaviorSubject<any>('');
    readonly userinfo$ = this._UserInfo.asObservable()

    get userinfo(): any { return this._UserInfo.getValue() }
    private set userinfo(userinfo: any) { this._UserInfo.next(userinfo) }


    addUserInfo() {
        return new Promise((resolve, reject) => { 
            this._http.get<any>(`${environment.apiUrl}/user/`)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.userinfo = response;
                    resolve(response)
                }
            );
        });

    }
}
