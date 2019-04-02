import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {UserServiceService} from '../services/user-service.service';
import {GlobalValuesCore} from '../core/global/GlobalValuesCore.core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginObject : LoginFields = {
    userName : '',
    password : ''
  }

  constructor(private _userService : UserServiceService,
              private _notification : GlobalValuesCore,
              private _router : Router) { }

  ngOnInit() {
  }

  loginUserWithCreditinals(userCreditinalsObject : LoginFields){
    var userName = userCreditinalsObject.userName;
    var password = userCreditinalsObject.password;

    var obs = this._userService.checkUserCreditiansls(userName,password);
    obs.subscribe((res) => {
      if(res){
        this._notification.displayToast("Welcome" + userName);
        this._router.navigate(['/welcome']);
      }else if(!res){
        this._notification.displayToast("Invalid UserName  or Password");
      }
    },(error) => {
      
    });

  }

}
interface LoginFields{
  userName;
  password;
}
