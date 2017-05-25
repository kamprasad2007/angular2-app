import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,  Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { CreateComponent } from './user/create/create.component';
import { ListComponent } from './user/list/list.component';
import { SearchComponent } from './core/search/search.component';
import { UserService } from './user/user.service';
import { CardComponent } from './user/card/card.component';

const appRoute: Routes =[
  { path : '' , redirectTo :'/home', pathMatch: 'full'},
  { path : 'home' , component: ListComponent},
  { path : 'list' , component: ListComponent, data:{ search:true }},
  { path : 'new' , component: CreateComponent},
  { path : 'edit/:id' , component: CreateComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CreateComponent,
    ListComponent,
    SearchComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
