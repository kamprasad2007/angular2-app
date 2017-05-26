import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import  'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() filterdUsers = new EventEmitter<User[]>();
  users: User[]
  openPanel: boolean = false
  mouseEnter: boolean = false
  searchBox: FormControl = new FormControl();

  constructor(private userService: UserService,
              private router: Router) { }

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
  }

  onBlur(){
    if(!this.mouseEnter)
      this.openPanel = false;
  }
}
