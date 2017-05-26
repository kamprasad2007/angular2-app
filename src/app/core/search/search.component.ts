import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import  'rxjs';

import { UserService } from '../../user/user.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('panelState', [
      state('start', style({
        opacity: 0
      })),
      state('end', style({
        opacity: 1
      })),
      transition('start => end', animate('500ms 50ms ease-in')),
    ])
  ]
})
export class SearchComponent implements OnInit {

  @Output() filterdUsers = new EventEmitter<User[]>();
  
  users: User[]
  openPanel: boolean = false
  mouseEnter: boolean = false
  searchBox: FormControl = new FormControl();
  state: string

  constructor(private userService: UserService,
              private router: Router) { 
                this.state = "start"
              }

  ngOnInit() {
    
    this.searchBox.valueChanges
                  .debounceTime(400)
                  .subscribe(
                    (event)=>{
                        this.userService.searchUsers(event).subscribe(
                            users =>{
                              this.users = users
                              this.filterdUsers.emit(users);
                            },
                            error =>{
                              console.log(error);
                            }
                        )
                    }
                  )

    this.userService.getAllUsers().subscribe(
      users=>{
        this.users = users;
      },
      error =>{
        console.log(error);
      }
    )
  }

  onMouseEnter(){
    this.mouseEnter = true;
  }

  onMouseLeave(){
    this.mouseEnter = false;
  }

  onClick(id: number){
    this.router.navigate(['./edit/'+ id]);
  }

  onMouseDown(){
    this.openPanel = true;
    setTimeout(()=>this.state = "end",10);
  }

  onBlur(){
    if(!this.mouseEnter){
      this.openPanel = false;
      this.state = "start";
    }
  }
}
