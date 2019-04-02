import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatFormFieldModule,MatInputModule,MatSelectModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MyNavComponent } from './my-nav/my-nav.component';
import { StudentComponent,DeleteStudentDialog } from './student/student.component';
import { FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { AddNewStudnetComponent } from './add-new-studnet/add-new-studnet.component';
import {HttpClientModule} from '@angular/common/http';
import {StudentService} from 'src/app/student/student.component.service';
import { StudentChartComponent } from './student-chart/student-chart.component';
import { ChartModule } from 'angular-highcharts';
import {HasValuePipePipe} from './core/pipes/has-value-pipe.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { CheckMarkPipePipe } from './core/pipes/check-mark-pipe.pipe';
import {GlobalValuesCore} from './core/global/GlobalValuesCore.core';
import { UsersmanagementComponent } from './usersmanagement/usersmanagement.component';
import { AddUserComponent } from './add-user/add-user.component';
import {UserServiceService} from './services/user-service.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    StudentComponent,
    AddNewStudnetComponent,
    StudentChartComponent,
    HasValuePipePipe,
    CheckMarkPipePipe,
    UsersmanagementComponent,
    AddUserComponent,
    DeleteStudentDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ChartModule,
    MatSnackBarModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [DeleteStudentDialog],
  providers: [StudentService,HasValuePipePipe,CheckMarkPipePipe,GlobalValuesCore,UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
