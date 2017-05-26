import { Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../model/user.model';



@Component({
  selector: 'user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
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

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.user.id > 8){
      this.message = "Do you want to delete this user?"
      this.allowToDelete = true
      this.profilePictureId = 9
    }else{
      this.profilePictureId = this.user.id;
    }
  }

  onClickEdit(id: number){
    this.router.navigate(['./edit/'+ id]);
  }

  onClickDelete(){
    this.showDialog = true;
  }

  onClickOk(id: number){
    this.onDeleteUser.emit(id)
    this.showDialog = false;
  }

  onClickCancel(){
    this.showDialog = false;
  }

}
