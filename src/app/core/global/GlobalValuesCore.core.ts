import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class GlobalValuesCore{

    constructor(private _notification : MatSnackBar){

    }

    displayToast(message : string){
        this._notification.open(message,"close",{
            duration : 2000
        });
    }
    
}