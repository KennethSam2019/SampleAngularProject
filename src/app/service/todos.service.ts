import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Users } from '../Interface/User';
import { Observable } from 'rxjs';
import { todos } from '../Interface/todos';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  url = "assets/todos.json";
  constructor(private http:HttpClient) { }

  getToDos(){
    return this.http.get<todos[]>(this.url);
  }
}
