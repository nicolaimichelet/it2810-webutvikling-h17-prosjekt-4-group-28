import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from "../../services/validate.service";
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'LOGIN';

  username: String;
  password: String;


  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  //login submit buttom
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    //if user is NOT valid, display flash message
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You are now logged in!", {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    });
  }
}
