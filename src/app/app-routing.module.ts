import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../app/student/student.component';
import {AddNewStudnetComponent} from '../app/add-new-studnet/add-new-studnet.component';
import {StudentChartComponent} from '../app/student-chart/student-chart.component';
import {UsersmanagementComponent} from '../app/usersmanagement/usersmanagement.component';
import {AddUserComponent} from '../app/add-user/add-user.component';
import {LoginComponent} from './login/login.component';
import {MyNavComponent} from './my-nav/my-nav.component';

const routes: Routes = [
  { path : '',redirectTo : '/login',pathMatch : 'full'},
  { path : 'login',component : LoginComponent},
  { path : 'welcome',component : MyNavComponent,
    children : [
      { path : 'student',component: StudentComponent},
      { path : 'addNewStudent/:id',component : AddNewStudnetComponent},
      { path : 'studnetGraph',component : StudentChartComponent},
      { path : 'users',component : UsersmanagementComponent},
      { path : 'addNewUser',component : AddUserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
