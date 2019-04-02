import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student/student.component.service';
import {Student} from '../models/student.model';
import {Marks} from '../models/Marks.model';
import {Router,ActivatedRoute} from '@angular/router';
import {HasValuePipePipe} from '../core/pipes/has-value-pipe.pipe';
import {CheckMarkPipePipe} from '../core/pipes/check-mark-pipe.pipe';
import {GlobalValuesCore} from '../core/global/GlobalValuesCore.core';

@Component({
  selector: 'app-add-new-studnet',
  templateUrl: './add-new-studnet.component.html',
  styleUrls: ['./add-new-studnet.component.css']
})
export class AddNewStudnetComponent implements OnInit {

  public studentId : number;
  public showSubmitButton : boolean;
  public showUpdateButton : boolean;
  public onceClicked : boolean = false;
  public inCorrectHindiMarks : boolean = false;
  public inCorrectEnglishMarks : boolean = false;
  public inCorrectMathMarks : boolean = false;
  public inCorrectScienceMarks : boolean = false;
  public inCorrectSStMarks : boolean = false;

  public genders = ["Male","Female"];

  studentObj : Student = {
    name : '',
    standard : '',
    rollNo : null,
    gender : '',
    marks : null,
    result : '',
    grades : ''
  }

  studentMark : Marks = {
    hindiMark : null,
    englishMark : null,
    mathMark : null,
    scienceMark : null,
    socialScienceMark : null,
    totalMark : null,
    percentage : null,
  }

  constructor(private studentService : StudentService,
              private _router : Router,
              private _activatedRoute : ActivatedRoute,
              private _hasValue : HasValuePipePipe,
              private _globalValueCore : GlobalValuesCore,
              private _checkMark : CheckMarkPipePipe) { }

  ngOnInit() {
    this.studentId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    if(this.studentId){
      this.showSubmitButton = false;
      this.showUpdateButton = true;
      this.studentService.getStudentById(this.studentId).subscribe((response : Student) => {
        if(response){
          this.studentObj = response;
          this.studentMark = response.marks;
        }
      },(error) => {
        console.log("eroor occurs",error);
      })
    }else{
      this.showSubmitButton = true;
      this.showUpdateButton = false;
    }
  }

  addNewStudent(studobj,markobj){
    
    let marksJson = {
      "hindiMark" : markobj.hindiMark,
      "englishMark" : markobj.englishMark,
      "mathMark" : markobj.mathMark,
      "scienceMark" : markobj.scienceMark,
      "socialScienceMark" : markobj.socialScienceMark,
      "totalMark" : markobj.totalMark,
      "percentage" : markobj.percentage
    };

    let studJson = {
      "name" : studobj.name,
      "standard" : studobj.standard,
      "rollNo" : studobj.rollNo,
      "gender" : studobj.gender,
      "result" : studobj.result,
      "grades" : studobj.grades
    };

    let mainjson = {
      "student" : studJson,
      "marks" : marksJson
    };

    var response = this.studentService.addNewStudentWithMark(mainjson);
    response.subscribe(() => {
      this.onceClicked = true;
      this._globalValueCore.displayToast("Studnet created successfully");
      this._router.navigate(['welcome/student']);
    },(error) => {
      this.onceClicked = false;
      console.log("error occured");
    })
  }

  updateStudent(obj,markobj){
    let json = {
      "id" : obj.id,
      "name" : obj.name,
      "standard" : obj.standard,
      "rollNo" : obj.rollNo,
      "gender" : obj.gender,
      "result" : obj.result,
      "grades" : obj.grades
    };

    let marksJson = {
      "id" : markobj.id,
      "hindiMark" : markobj.hindiMark,
      "englishMark" : markobj.englishMark,
      "mathMark" : markobj.mathMark,
      "scienceMark" : markobj.scienceMark,
      "socialScienceMark" : markobj.socialScienceMark,
      "totalMark" : markobj.totalMark,
      "percentage" : markobj.percentage
    };

    let mainJson = {
      "student" : json,
      "marks" : marksJson
    };
    
    var response = this.studentService.updateStudentWithMark(mainJson);
    response.subscribe(() => {
      this._globalValueCore.displayToast("Studnet updated Successfully");
      this._router.navigate(['welcome/student']);
    },(error) => {
      console.log("error occured");
    })
  }

  calculatTotalMark(markObj,event){
    if(this._hasValue.transform(markObj.hindiMark)){
      if(!this._checkMark.transform(markObj.hindiMark)){
        this._globalValueCore.displayToast("Incorrect Hindi Marks");
      }
    }
    
    if(this._hasValue.transform(markObj.englishMark)){
      if(!this._checkMark.transform(markObj.englishMark)){
          this._globalValueCore.displayToast("Incorrect English Marks");
      }
    }
    if(this._hasValue.transform(markObj.mathMark)){
      if(!this._checkMark.transform(markObj.mathMark)){
        this._globalValueCore.displayToast("Incorrect Math Marks");  
      }
    }
    if(this._hasValue.transform(markObj.scienceMark)){
      if(!this._checkMark.transform(markObj.scienceMark)){
        this._globalValueCore.displayToast("Incorrect Science Marks");
      }
    }
    if(this._hasValue.transform(markObj.socialScienceMark)){
      if(!this._checkMark.transform(markObj.socialScienceMark)){
        this._globalValueCore.displayToast("Incorrect Social Science Marks");
      }
    }


    if(markObj.hindiMark && markObj.englishMark && markObj.mathMark && markObj.scienceMark && markObj.socialScienceMark){
      this.studentMark.totalMark = markObj.hindiMark + markObj.englishMark + markObj.mathMark + markObj.scienceMark + markObj.socialScienceMark;
      if(this.studentMark.totalMark){
        if(this.studentMark.totalMark >= 200){
          this.studentObj.result = "Pass";
        }else{
          this.studentObj.result = "Fail";
        }
        this.studentMark.percentage = (this.studentMark.totalMark/500) * 100;
        if(this.studentMark.percentage){
          if(this.studentMark.percentage >= 90){
            this.studentObj.grades = "A_PLUS"
          }else if(this.studentMark.percentage <= 89 && this.studentMark.percentage >= 80){
            this.studentObj.grades = "A";
          }else if(this.studentMark.percentage <= 79 && this.studentMark.percentage >= 70){
            this.studentObj.grades = "B_PLUS";
          }else if(this.studentMark.percentage <= 69 && this.studentMark.percentage >= 60){
            this.studentObj.grades = "B";
          }else if(this.studentMark.percentage <= 59 && this.studentMark.percentage >= 50){
            this.studentObj.grades = "C_PLUS";
          }else if(this.studentMark.percentage <= 49 && this.studentMark.percentage >= 40){
            this.studentObj.grades = "C";
          }else{
            this.studentObj.grades = "D";
          }
        }
      }
    }
  }

}


