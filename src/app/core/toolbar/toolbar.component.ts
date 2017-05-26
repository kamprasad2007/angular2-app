import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNewTab(){
    window.open('https://github.com/kamprasad2007/angular2-app');
  }
}
