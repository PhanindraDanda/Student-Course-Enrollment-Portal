import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderInterceptor } from './interceptor/httpinterceptor';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './state/reducer/cart.reducer';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule } from '@angular/fire/compat';
import {MatSnackBarModule} from '@angular/material/snack-bar'


import { BlockUIModule } from 'ng-block-ui';
import { CartEffects } from './state/effect/cart.effect';
import { UserStoreService } from './services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthReducer } from './state/reducer/auth.reducer';
import { HomeReducer } from './state/reducer/home.reducer';
import { HomeEffects } from './state/effect/home.effects';
import { LearningsReducer } from './state/reducer/course.reducer';
import { LearningEffects } from './state/effect/course.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      course:courseReducer,
      auth:AuthReducer,
      home:HomeReducer,
      learning:LearningsReducer
    }),
    EffectsModule.forRoot([CartEffects,HomeEffects,LearningEffects]),
    CommonModule,
    HttpClientModule,
    NgxStripeModule.forRoot(environment.stripe_pk),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BlockUIModule.forRoot(),
    MatSnackBarModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HeaderInterceptor,
    multi:true
  },
  {
    provide: APP_INITIALIZER,
    useFactory : (userService:UserStoreService) =>
    () => userService,
    deps: [UserStoreService],
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
