import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {ValidateService} from "../../services/validate.service";
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [AuthService, ValidateService, FlashMessagesService, HttpModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('LoginComponent', () => {
  let component: LoginComponent;
  component.username = 'rob';
  component.password = 'pwd'

  it('username should be rob when rob has logged in', () => {
    component.onLoginSubmit();
    expect(component.username).toEqual('rob');
  });
});*/

});
