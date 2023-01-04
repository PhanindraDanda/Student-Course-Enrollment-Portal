import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, lastValueFrom, Observable, switchMap } from 'rxjs';
import { io } from 'socket.io-client';
import { ClearCart } from '../state/action/cart.action';
import { CourseState } from '../state/reducer/cart.reducer';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  
  socket:any;
  error_listner = new BehaviorSubject(false);

  constructor(private auth:AuthenticationService, private _cartService: Store<{course:CourseState}>, private route:Router) { 
   
  }
  
  initialiseSocket()
  {
    this.socket = io("ws://localhost:8082",{
      withCredentials:true
    });
  }

  authlistner()
  {
      this.socket.on('authentication_error',()=>{
        console.log("[Auth Error] Failed to Authenticate User");
        this.auth.signOut();
      });
}

 connection_close_listner()
 {
    return new Observable(observer => {
      this.socket.on('disconnect',()=>{
        console.log(`[Socket Disconnected] Socket has been disconnected`);
        this.error_listner.next(true);
        this.socket.disconnect()
      })
    });
 }

  payment_status_listner(eventname:any)
  {
    return new Observable(observer => {
      this.socket.on(eventname,(data:any)=>{
        observer.next(data);
      })
    })
  }

 

}