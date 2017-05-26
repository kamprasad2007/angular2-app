import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
// import { AppConfig } from '../config/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

   private baseUrl: string = 'https://user-management-ui.herokuapp.com'

  constructor(private http: Http) { }

  searchUsers(searchText: string): Observable<User[]>{
    if(searchText=='')
      searchText = '*';

    return this.http.get(this.baseUrl + "/api/user/search/"+ searchText)
            .map(this.extractData)
            .catch(this.handleError);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get(this.baseUrl + "/api/user/all")
            .map(this.extractData)
            .catch(this.handleError);
  }
  
  getUser(userId: number): Observable<User>{
    let header =new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions(header);

    return this.http.get(this.baseUrl + "/api/user/" + userId,options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  createUser(user :  User): Observable<User>{
    let header =new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions(header);
    
    return this.http.post( this.baseUrl + "/api/user/create",{ user }, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  deleteUser(userId: number): Observable<boolean>{
     return this.http.delete(this.baseUrl + "/api/user/" + userId)
            .map(this.extractData)
            .catch(this.handleError);
  }

  updateUser(user: User): Observable<boolean>{
     let header =new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions(header);
     return this.http.post(this.baseUrl + "/api/user/update",{ user },options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
