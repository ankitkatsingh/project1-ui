import { WorkSpace } from './WorkSpace.model';
import { Roles } from './Roles.model';

export class Users {
    userName : String;
	firstName : String;
	lastName : String;
	password : String
	workSpace : WorkSpace;
	roles : Roles[];
}
