import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StripeService } from 'ngx-stripe';
import { BehaviorSubject, Observable, Subscriber, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState } from '../state/reducer/auth.reducer';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user = new BehaviorSubject<any>(undefined);
  token = new BehaviorSubject<string>("");

  constructor(private _http:HttpClient, 
    private stripeService:StripeService, 
    private auth:AuthenticationService,
    private _authStore:Store<{auth:AuthState}>

    ) {

    this.auth.$user.subscribe(user=>{
      this.user.next(user);
    })

    this._authStore.select('auth').subscribe(token=>{
      this.token.next(token.token)
    })
    
   }

  getCartItems()
  {
    return this._http.get<any>(`${environment.apiUrl}/cart`);
  }
  
  getLocalCartItems()
  {
    return  new Observable<any>((observer: Subscriber<any>) => {
      
      if(localStorage.getItem('cart') !== undefined)
      {
        observer.next(localStorage.getItem('cart'));
      }
      else{
        observer.next([]);
      }
     
    });
  }

  addToCart(data:any)
  {
    console.log(data);
    if(this.token.getValue() !== "")
    {
      return this._http.put<any>(`${environment.apiUrl}/cart/add`,data);
    }
    else{
      return  new Observable<any>((observer: Subscriber<any>) => {
        observer.next(this.saveDatatoLocalStorage(data));
      });
    }
  }

  RemoveCart(data:any)
  {
    if(this.token.getValue() !== "")
    {
      console.log(data);
      return this._http.delete<any>(`${environment.apiUrl}/cart/remove/${data.productid}`);
    }
    else{
      return  new Observable<any>((observer: Subscriber<any>) => {
        let cart_data:any = JSON.parse(localStorage.getItem('cart')  || "");
        cart_data = cart_data.filter((item:any)=>{
          return item.id !== data.id;
        })
        console.log(cart_data);
        
        observer.next(this.saveDatatoLocalStorage(cart_data));
      });
  }
  }

  checkout(data:any){
      console.log(data);
      return this._http.get(`${environment.apiUrl}/cart/create-checkout-session`).
      pipe(
        switchMap((session:any)=>{
          return this.stripeService.redirectToCheckout({ sessionId: session.sessionId });
        })
      )
      .subscribe(result=>{
        if(result.error)
        {
          console.log(result.error);
        }
      })
  }   

  saveDatatoLocalStorage(data:any)
  {
    let cart:any = localStorage.getItem('cart');
    let cartval:any[];
    if(cart){cartval = JSON.parse(cart)}
    else{
      cartval = [];
    }
    cartval.push(data.course);
    localStorage.setItem('cart',JSON.stringify(cartval));

    return cartval;
  }


}
