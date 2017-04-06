/**
 * Created by mvdve on 28-3-2017.
 */

import {Injectable} from "@angular/core";
import {User} from "./User";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Kweet} from "./Kweet";


@Injectable()
export class UserService{

  private baseUrl = 'http://localhost:8080/kwetter/api';
  private loggedIn = false;
  private token : string;

  constructor(private http: Http){
    this.loggedIn = !!localStorage.getItem('token');
  }

  getUser(username) : Observable<User>{

    //return this.http.get(this.baseUrl + '/users' + '/name' + '/admin').map(this.extractData).catch(this.handleError);
    return this.http.get('http://localhost:8080/kwetter/api/users/name/'+username).map((res:Response) => res.json());
  }

  getUserById(id) : Observable<User>{
    //return this.http.get(this.baseUrl + '/users' + '/name' + '/admin').map(this.extractData).catch(this.handleError);
    return this.http.get('http://localhost:8080/kwetter/api/users/'+id).map((res:Response) => res.json());
  }

  getUserList(userIds : number[]) : Observable<User[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("getting userlist");
    return this.http.put('http://localhost:8080/kwetter/api/users/list', JSON.stringify(userIds), options).map((res:Response) => res.json());
  }

  getUserKweetsList(userId : number) : Observable<Kweet[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("getting kweetlist");
    return this.http.get('http://localhost:8080/kwetter/api/kweets/user/' + userId, options).map((res:Response) => res.json());
  }

/*
  getUserList(userIds : number[]): User[]{
    let returnUsers : User[] = [];

    for(let userId of userIds){
      //let user : User;

      let user = this.getUserById(userId);
      console.log(user);

    }

    console.log(returnUsers);

    return Observable.from(returnUsers);
  }
  */
}