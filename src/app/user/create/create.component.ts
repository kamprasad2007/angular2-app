import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable }       from 'rxjs/Observable';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userId: number
  user: User = new User('','','')

  constructor(private userService : UserService,
              private router: Router,
              private route: ActivatedRoute) { }

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
  }

  onSubmit(form: NgForm){
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
