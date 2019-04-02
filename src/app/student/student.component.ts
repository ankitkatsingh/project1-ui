import { Component, OnInit,Inject} from '@angular/core';
import {StudentService} from '../student/student.component.service';
import {Router} from '@angular/router';
import {HasValuePipePipe} from '../core/pipes/has-value-pipe.pipe';
//import {Marks} from '../models/Marks.model';
import { Student } from '../models/student.model';
import {GlobalValuesCore} from '../core/global/GlobalValuesCore.core';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  dataSource ;
  noDataFound ;
  displayedColumns: string[] = ['Name','StudentId','Class', 'RollNo', 'Gender','Percentage','Result','Action'];

  constructor(private studentService : StudentService,
              private _router : Router,
              private _hasValue : HasValuePipePipe,
              private _globalValuesCore : GlobalValuesCore,
              private _dialog : MatDialog) {
  }

  ngOnInit() {
    this.getAllStudentsList();
  }

  getAllStudentsList(){
    var obs = this.studentService.getAllStudents();
    obs.subscribe((response : Student[]) => {
      if(this._hasValue.transform(response)){
        this.noDataFound = false;
        this.dataSource = response;
      }else{
        this.noDataFound = true;
      }
    },(error) => {
       console.log("Error Ocuured");
    });

  }

  updateStudent(id){
    this._router.navigate(['welcome/addNewStudent',id]);
  }

  exportStudents(){
    var obs = this.studentService.exportStudnetList();
    obs.subscribe((response : ExcelDownlodFormat)  => {
      //window.open(response.destinationFilePath,"_blank");
    },(error) => {
      console.log("error in downloading")
    })
  }

  openDeleteModelWindow(studentId : Number){
   this._dialog.open(DeleteStudentDialog,{
      data : {
        studentId : studentId
      }
    });

    var modelClosedObs = this._dialog.afterAllClosed;
    modelClosedObs.subscribe((res) => {
      this.getAllStudentsList();
    },(error) => {
      this._globalValuesCore.displayToast(error);
    })
  }

  openStudentGraphState(){
    this._router.navigate(['welcome/studnetGraph']);
  }

  openAddStudentState(){
    this._router.navigate(['welcome/addNewStudent',0]);
  }
}

@Component({
  selector: 'delete-studnet-dialog',
  templateUrl: 'delete-student-dialog.html',
})
export class DeleteStudentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private studentService : StudentService,
              private _globalValuesCore : GlobalValuesCore) {}
  
  deleteStudentById(){
    var obs = this.studentService.deleteStudentById(this.data.studentId);
    obs.subscribe(() => {
      this._globalValuesCore.displayToast("Student Delete Successfully");
    },() => {
      console.log("error occured");
    });
  }
}

interface ExcelDownlodFormat{
   destinationFilePath;
}
