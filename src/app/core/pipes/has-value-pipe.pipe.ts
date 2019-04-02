import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasValuePipe'
})
export class HasValuePipePipe implements PipeTransform {

  transform(val: any, args?: any): any {
    
    return (val !== null && val !== 0 && val !== undefined && val != "undefined" && val != "null" && (val !== "" || String(val) == "0") && val != "-Please select-" && val != "--" && ((Array.isArray(val) ? (val.length > 0 ? true : false) : true))); 
  }

}
