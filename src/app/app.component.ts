import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { todos } from './Interface/todos';
import { Users } from './Interface/User';
import { TodosService } from './service/todos.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SampleAngularProject';
  UserList:Users[] = [];
  pageNumber:number= 1;
  pageNumberTodo:number= 1;
  searchFilter:any;
  showForm:boolean = false;
  formUser!: FormGroup;
  isFormEdit:boolean = false;
  selectedIndex:number= -1;
  user:Users = {
    FirstName: "",
    MiddleName: "",
    SurName: "",
    Age:0
  };
  todolist:todos[] = [];
  PageCount:number = 10;
  constructor(private userService:UserService,private todosService:TodosService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    // this.setUserDefaultValue();
    this.InitializeDefault();

  }

  InitializeDefault(){
    let list = JSON.parse(localStorage.getItem('userList') || '{}');
    if(list.length > 0){
      this.UserList = list;
    }else{
      this.userService.getUsers().subscribe(result=> {
        this.UserList = result;
        localStorage.setItem('userList',JSON.stringify(result));
      });
    }

    console.log(this.UserList);

    //setup formgroup
    this.formUser = this.formBuilder.group({
      FirstName:['',Validators.required],
      MiddleName:['',Validators.required],
      SurName:['',Validators.required],
      Age:['',[Validators.required]]
    })
  }
  Search(){
    if (this.searchFilter == "" || this.searchFilter == undefined){
      this.ngOnInit();
    }else{
      this.UserList = this.UserList.filter(x=>{
        return x.FirstName.toLocaleLowerCase().match(this.searchFilter.toLocaleLowerCase()) || x.SurName.toLocaleLowerCase().match(this.searchFilter.toLocaleLowerCase()) || x.MiddleName.toLocaleLowerCase().match(this.searchFilter.toLocaleLowerCase());
      })

      // this.UserList = this.UserList.filter(x=>{
      //   console.log(x);
      //   return x.FirstName.toLocaleLowerCase().match(this.searchFilter.toLocaleLowerCase());
      // })
    }
  }

  setForm(){
    this.formUser.reset();
    this.showForm = !this.showForm;
    // this.setUserDefaultValue();
  }

  Save(){


    if(this.isFormEdit){
      if(this.confirmationMessage(environment.Message.UPDATE)){
        this.showForm = !this.showForm;
        let list = JSON.parse(localStorage.getItem('userList') || '{}');
        list[this.selectedIndex] =this.formUser.value;
        localStorage.removeItem('userList');
        localStorage.setItem('userList',JSON.stringify(list));
        this.UserList = list;
        alert(environment.Message.SUCCESS_UPDATE);
      }
    }else{
      if(this.confirmationMessage(environment.Message.SAVE)){
        this.showForm = !this.showForm;
        let list = JSON.parse(localStorage.getItem('userList') || '{}');
        list.push(this.formUser.controls.value);
        localStorage.removeItem('userList');
        localStorage.setItem('userList',JSON.stringify(list));
        this.UserList = list;
        alert(environment.Message.SUCCESS_SAVE);
      }
    }
    this.selectedIndex = -1;
    this.isFormEdit =false;

  }

  Delete(index:number){
    if(this.confirmationMessage(environment.Message.DELETE)){
      let list = JSON.parse(localStorage.getItem('userList') || '{}');
      list.splice(index,1);
      localStorage.removeItem('userList');
      localStorage.setItem('userList',JSON.stringify(list));
      this.UserList = list;
      alert(environment.Message.SUCCESS_DELETE);
    }

  }
  Edit(index:number){
    this.selectedIndex = index;
    this.isFormEdit = true;
    let list = JSON.parse(localStorage.getItem('userList') || '{}');
    this.formUser.setValue(list[index]);
    this.showForm = !this.showForm;
  }
  confirmationMessage(message:string){
    let result = confirm(message);
    return result;
  }
}
