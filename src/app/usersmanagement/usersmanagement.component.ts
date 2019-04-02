import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import { Users } from '../models/Users.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.css']
})
export class UsersmanagementComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['UserName','FirstName','LastName','WorkSpace','Action'];

  constructor(private _userService : UserServiceService,
              private _router : Router) { }

  ngOnInit() {
    this.getAllExistingUserList();
  }

  getAllExistingUserList(){
    var obs = this._userService.getAllExistingUserList();
    obs.subscribe((res) => {
      this.dataSource = res;
    },(error) => {

    });
  }

  openAddNewUserState(){
    this._router.navigate(['welcome/addNewUser']);
  }

}
