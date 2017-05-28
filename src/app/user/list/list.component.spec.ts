import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ListComponent } from './list.component';
import { SearchComponent } from '../../core/search/search.component';
import { CardComponent } from '../card/card.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

export class UserServiceStub{
};

export class ActivatedRouteStub{

};

const mock = {
    params: Observable.of({})
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, SearchComponent, CardComponent ],
       providers: [
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .overrideComponent(ListComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: UserServiceStub },
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
