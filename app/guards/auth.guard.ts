import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '../state/reducer/auth.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    $token = new BehaviorSubject<string>("")
    constructor(private _store:Store<{auth:AuthState}>,private route:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
         this._store.select('auth').subscribe(token=>{
           this.$token.next(token.token);
         })

         if(this.$token.getValue() === "")
         {
            this.route.navigateByUrl('/home');
            return false;
         }

         return true;
       
    }
}