import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  Routes } from '@angular/router';

import { ListComponent } from './user/list/list.component';
import { CreateComponent } from './user/create/create.component';

const appRoute: Routes =[
  { path : '' , redirectTo :'/home', pathMatch: 'full'},
  { path : 'home' , component: ListComponent},
  { path : 'list' , component: ListComponent, data:{ search:true }},
  { path : 'new' , component: CreateComponent},
  { path : 'edit/:id' , component: CreateComponent},
]


@NgModule({
  imports: [
      RouterModule.forRoot(appRoute)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRouteModule { }
