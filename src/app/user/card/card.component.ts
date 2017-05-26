import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  showDialog: boolean = false
  message: string = "This record does not allow to delete !"
  allowToDelete: boolean = false
  profilePictureId: number

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
