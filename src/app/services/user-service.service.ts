import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  workSpaceBaseurl = "http://localhost:8080/TimePass/api/WorkSpace/";
  rolesBaseUrl = "http://localhost:8080/TimePass/api/Roles/";
  usersBaseUrl = "http://localhost:8080/TimePass/api/Users/";

  constructor(private _http : HttpClient) { }

  getAllWorkSpace(){
    return this._http.get(this.workSpaceBaseurl + "getAllWorkSpaceList");
  }

  getAllRolesList(){
    return this._http.get(this.rolesBaseUrl + "getAllRoles");
  }

  addNewUser(json){
    return this._http.post(this.usersBaseUrl + "createNewUser",json,{
        headers : new HttpHeaders({
            'content-type' : 'application/json'
        })
    })
  }

  checkUserCreditiansls(userName,password){
    return this._http.get(this.usersBaseUrl + "checkUserCreditians/" + userName + "/" + password);
  }

  getAllExistingUserList(){
    return this._http.get(this.usersBaseUrl + "getAllExistingUserList");
  }
}
