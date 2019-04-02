import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkMarkPipe',
})
export class CheckMarkPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value <= 100 && value >= 0){
      return true;
    }else{
      return false;
    }
  }

}
