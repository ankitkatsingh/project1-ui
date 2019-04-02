import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,throwError,pipe, of} from 'rxjs';
import {map, catchError,filter} from 'rxjs/operators';
import {Student} from '../models/student.model';

@Injectable()
export class StudentService{

    baseUrl = "http://localhost:8080/TimePass/api";
    
    constructor(private http : HttpClient){
    }

    getAllStudents(){
        return this.http.get(this.baseUrl + "/getAllStudent");
    }

    addNewStudent(json){
        return this.http.post(this.baseUrl + "/createNewStudent",json,{
            headers : new HttpHeaders({
                'content-type' : 'application/json'
            })
        })
    }

    updateStudent(json){
        return this.http.put(this.baseUrl + "/updateStudent",json,{
            headers : new HttpHeaders({
                'content-type' : 'application/json'
            })
        })
    }
    
    deleteStudentById(id : number){
       return this.http.delete(this.baseUrl + "/deleteById/" + id);    
    }

    getStudentById(studentId : number){
        return this.http.get(this.baseUrl + "/findById/" + studentId);
    }

    exportStudnetList(){
        return this.http.get(this.baseUrl + "/exportStudnetList");
    }

    addNewStudentWithMark(json){
        return this.http.post(this.baseUrl + "/createStudnetWithMarks",json,{
            headers : new HttpHeaders({
                'content-type' : 'application/json'
            })
        })
    }

    updateStudentWithMark(json){
        return this.http.post(this.baseUrl + "/createStudnetWithMarks",json,{
            headers : new HttpHeaders({
                'content-type' : 'application/json'
            })
        })
    }

    getStudentGradesByGroup(){
        return this.http.get(this.baseUrl + "/getStudentGradesByGroup");
    }

    
}