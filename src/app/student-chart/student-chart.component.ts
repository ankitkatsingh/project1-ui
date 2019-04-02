import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {StudentService} from '../student/student.component.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.css']
})
export class StudentChartComponent implements OnInit {

  chart = new Chart({
    chart: {
      type: 'pie'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
      }
    },
    series: null
  });

  constructor(private _service : StudentService) { }

  ngOnInit() {
    let series = {
      name: 'Brands', 
      colorByPoint: true,
      type : null,
      data :null
    };
    var mainData = [];
    var promise = this._service.getStudentGradesByGroup();
    promise.subscribe((response) => {
     _.forEach(response,function(value,key){
        var json = {
          "name" : value[0],
          "y" : value[1]
        };
        mainData.push(json);
      });
      series.data = mainData;
      this.chart.addSeries(series,true,true);
    },(error)=>{
      console.log("Error occured");
    })
  }
}
