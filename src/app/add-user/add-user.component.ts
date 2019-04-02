import { Component, OnInit } from '@angular/core';
import { Users } from '../models/Users.model';
import {UserServiceService} from '../services/user-service.service';
import {GlobalValuesCore} from '../core/global/GlobalValuesCore.core';
import { WorkSpace } from '../models/WorkSpace.model';
import { Roles } from '../models/Roles.model';
import {StateConstants} from '../common/state.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userObj : Users = {
    "userName" : "",
    "firstName" : "",
    "lastName" : "",
    "password" : "",
    "roles" : null,
    "workSpace" : null
  }

  workSpaceList;
  rolesList;

  constructor(private _userService : UserServiceService,
              private _globalValuesCore : GlobalValuesCore,
              private _router : Router) { }

  ngOnInit() {
    this.getAllWorkSpaces();
    this.getAllRolesList();
  }

  
  getAllWorkSpaces(){
    var obs = this._userService.getAllWorkSpace();
    obs.subscribe((res : WorkSpace) => {
      this.workSpaceList = res;
    },(error : Error) => {
      console.log("Error===",error);
    })
  }

  getAllRolesList(){
    var obs = this._userService.getAllRolesList();
    obs.subscribe((res : Roles) => {
      this.rolesList = res;
    },(error : Error) => {
      console.log("Error===",error);
    })
  }
  
  addNewUser(userObj : Users){
    var roles = [];
    for(let i=0;i<userObj.roles.length;i++){
       var roleObj = {
         "id" : userObj.roles[i]
       }
      roles.push(roleObj);
    }

    var json = {
      userName : userObj.userName,
      firstName : userObj.firstName,
      lastName : userObj.lastName,
      password : userObj.password,
      roles : roles,
      workSpace : {
        "id" : userObj.workSpace
      }
    }
    
    var obs = this._userService.addNewUser(json);
    obs.subscribe((res : Users) => {
      this._globalValuesCore.displayToast("User Created Successfully");
      this._router.navigate([StateConstants.getUserListingState()]);
    },(error : Error) => {
      console.log("Error ===",error);
    })
  }

}
