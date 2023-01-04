import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Pusher from 'pusher-js/types/src/core/pusher';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { CourseInterface } from 'src/app/components/course/course.interface';
import { PusherService } from 'src/app/services/pusher.service';
import { WebSocketService } from 'src/app/services/socket.service';
import { UserStoreService } from 'src/app/services/user.service';
import { ClearCart } from 'src/app/state/action/cart.action';
import { GetLearnings } from 'src/app/state/action/course.action';
import { CourseState } from 'src/app/state/reducer/cart.reducer';
import { LearningState } from 'src/app/state/reducer/course.reducer';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  param = new BehaviorSubject({});
  userdata = new BehaviorSubject({});
  pusherClient = new BehaviorSubject<any>(undefined);
  pusherChannel = new BehaviorSubject<any>(undefined);

  @BlockUI() blockUI?: NgBlockUI;
  
  constructor(private route:ActivatedRoute, 
    private _learningStore:Store<{learning:LearningState}>,
    private _socket:WebSocketService,
    private user:UserStoreService,
    private pusherService:PusherService,
    private _CartStore:Store<{course:CourseState}>
    ) {
       
     this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if(params !==null || params !== undefined) {
         this.param.next(params['session_id']);
        }
      })
     
      if(this.param.getValue() !== undefined)
      {
          this._socket.initialiseSocket();
      } 

     }

  courseList = new BehaviorSubject<CourseInterface[]>([]);

  async ngOnInit(): Promise<void> {

    if(this.param.getValue() !== undefined && sessionStorage.getItem('checkout_id') !==null)
    {   
      this.blockUI?.start("Updating Payment Status..."); 
      this.user.userinfo$.subscribe(data=>{
        console.log(data);
        this._socket.payment_status_listner(data?.email).subscribe((data:any)=>{
          console.log(data);

          if(data.successcode === 200)
          {
            console.log(data.message);
            this._socket.socket.disconnect();
            sessionStorage.removeItem('checkout_id');
            this._learningStore.dispatch(GetLearnings());
            this._CartStore.dispatch(ClearCart())
            this.blockUI?.stop();
            location.reload()
          }
         
        })
       })
    
      this._socket.authlistner(); // Listens for Authentication Error
      this._socket.connection_close_listner(); // Listen for Socket Close Event
     

    } 

    this._learningStore.select('learning').subscribe(val=>{
      console.log(val.courseList);
      this.courseList.next(val.courseList);
     })
  
  }
}

