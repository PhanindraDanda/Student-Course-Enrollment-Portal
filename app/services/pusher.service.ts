import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { AuthTransports } from 'pusher-js/types/src/core/auth/auth_transports';
import { ChannelAuthorizerProxy } from 'pusher-js/types/src/core/auth/deprecated_channel_authorizer';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStoreService } from './user.service';

@Injectable({providedIn: 'root'})
export class PusherService {
    constructor(private user: UserStoreService) {
    
    }

    initialisePusher() 
    {
        console.log('Initializing Pusher Client')
       return new Pusher('4ded3fb88d9e5d11ceda', 
        { 
          cluster: 'ap2' ,
          authorizer: (channel:any,option:any)=>{
            return {
                authorize(socketId, callback) {
                    fetch(`${environment.apiUrl}/authenticate/socket`, {
                        method: "POST",
                        headers: new Headers({ "Content-Type": "application/json" }),
                        body: JSON.stringify({
                          socket_id: socketId,
                          channel_name: channel.name
                        }),
                        credentials: 'include'
                      }).then((res:any) => {
                        if (!res.ok) {
                          throw new Error(`Received ${res.statusCode} from ${environment.apiUrl}`);
                        }
                        console.log(res)
                        return res.json();
                      })
                      .then((data:any)=>{
                        callback(null,JSON.parse(data));
                      })
                      .catch(err => {
                        callback(new Error(`Error calling auth endpoint: ${err}`), {
                          auth: ""
                        });
                    })

                },
            }
          }
        });
    }

    Subscribe(pusherClient : Pusher) : Channel
    {
        return pusherClient.subscribe('private-payment_status');
    }

    closePusherConnection(pusherClient : Pusher)
    {
        pusherClient.disconnect();
    
    } 
}