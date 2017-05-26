import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[]
  enableSearch: boolean = false

  constructor(private userService: UserService, private route:ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.enableSearch = data.search;
      }
    );

    this.getAllUsers();
  }

  private getAllUsers(){
    this.userService.getAllUsers().subscribe(
      users =>{
        this.users = users;
      },
      error =>{
        console.log(error);
      }
    )
  }

  searchResult(users: User[]){
    this.users = users
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(
      result =>{
        this.getAllUsers();
      },
      error =>{
        console.log(error);
      }
    );
    
  }

}
