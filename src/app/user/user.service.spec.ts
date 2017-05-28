import { TestBed, inject } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Http, Response, ResponseOptions, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http'

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          UserService, 
          Http,
          {provide: RequestOptions, useClass: BaseRequestOptions},
          {provide: ConnectionBackend, useClass: MockBackend},]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
