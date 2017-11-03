import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'REGISTER';

  name: String;
  username: String;
  password: String;

  //Taken in necessary services like flash, router and auth
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
  }

  //This function registers a user on submit button
  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      password: this.password
    };

    //Required fields - displays flash msg if one or more fields are missing input
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    //Register user - actually registers user. Shows flash msg if success or if it didn't work.
    this.authService.registerUser(user).subscribe(data => {
      if (data.success){
        this.flashMessage.show('You are now registered and can log in!', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/login']);
      }else {
        this.flashMessage.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/register']);

      }
    });


  }

}
