import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
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

  onKeyUp(searchText: string){
    this.userService.searchUsers(searchText).subscribe(
      users =>{
        this.users = users
        this.filterdUsers.emit(users);
      },
      error =>{
        console.log(error);
      }
    )
  }
}
