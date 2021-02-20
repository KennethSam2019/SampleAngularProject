import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Users } from '../Interface/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url = "assets/user.json";

  getUsers(){
    return this.http.get<Users[]>(this.url);
  }

  getUsersInfo(){
    return this.http.get<Users[]>(this.url);
  }
}
