import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[]
  enableSearch: boolean = false


  constructor(private userService: UserService, private route:ActivatedRoute) { }

  ngOnInit() {
    //access route data
    this.route.data.subscribe(
      data => {
        this.enableSearch = data.search;
      }
    );

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

}
