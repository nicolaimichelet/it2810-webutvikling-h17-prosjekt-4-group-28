import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  //check if name, username and password is undefined
  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }



}
