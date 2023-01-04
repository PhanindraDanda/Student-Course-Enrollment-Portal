import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModule } from './view/view.module';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./view/view.module').then(m=>m.ViewModule)
   },
   {
    path:'**',
    redirectTo:'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ViewModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
