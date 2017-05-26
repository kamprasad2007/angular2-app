import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  animations: [
    trigger('createState', [
      state('start', style({
        opacity: 0
      })),
      state('end', style({
        opacity: 1
      })),
      transition('start => end', animate('1000ms 100ms ease-in')),
    ])
  ]
})
export class CreateComponent implements OnInit {

  userId: number
  user: User = new User('','','')
  submitted: boolean = false
  state: string

  constructor(private userService : UserService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.state = "start"
              }

  ngOnInit() {
    this.route.params.subscribe(params=>{
        this.userId = +params['id'];
        if(this.userId){
          this.userService.getUser(this.userId).subscribe(
            (user:User)=>{
              this.user = user;
            }
          );
        }
    })
    setTimeout(()=>this.state = "end",10);
  }

  onSubmit(form: NgForm){

    this.submitted = true;

    if(!form.valid)
      return;

    if(!this.userId){
      this.userService.createUser(form.value).subscribe(
        (user:User) => {
          this.router.navigate(['./edit/'+ user.id]);
        },
        error =>{
          console.log(error);
        }
      );
    }else{
      this.userService.updateUser(form.value).subscribe();
    }
    
  }
}
