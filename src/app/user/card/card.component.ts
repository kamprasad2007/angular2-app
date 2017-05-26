import { Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../model/user.model';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardState', [
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
export class CardComponent implements OnInit {

  @Input() user: User;
  @Output() onDeleteUser = new EventEmitter<number>();
  

  @HostListener('mouseenter') onMouseEnter(){
    this.showActionButtons = true;
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.showActionButtons = false;
  }


  showDialog: boolean = false
  message: string = "This record is not allowed to delete. !"
  allowToDelete: boolean = false
  profilePictureId: number
  showActionButtons: boolean = false
  state: string

  constructor(private router: Router) {
    this.state = "start"
  }

  ngOnInit() {
    if(this.user.id > 8){
      this.message = "Do you want to delete this user?"
      this.allowToDelete = true
      this.profilePictureId = 9
    }else{
      this.profilePictureId = this.user.id;
    }
    setTimeout(()=>this.state = "end",10);
  }

  onClickEdit(id: number){
    this.router.navigate(['./edit/'+ id]);
  }

  onClickDelete(){
    this.state = "end";
    this.showDialog = true;
  }

  onClickOk(id: number){
    this.onDeleteUser.emit(id);
    this.showDialog = false;
  }

  onClickCancel(){
    this.showDialog = false;
  }

}
