import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';



@Component({
  selector: 'user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user: User;
  showDialog: boolean = false

  constructor(private router: Router) { }

  ngOnInit() {
  }


  onClickEdit(id: number){
    this.router.navigate(['./edit/'+ id]);
  }

  onClickDelete(){
    this.showDialog = true;
  }

  onClickOk(id: number){
    this.showDialog = false;
  }

  onClickCancel(){
    this.showDialog = false;
  }

}
