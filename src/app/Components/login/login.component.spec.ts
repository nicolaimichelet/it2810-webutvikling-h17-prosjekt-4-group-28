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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule, HttpClientModule],
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

  it('Robby is logged in', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    app.username = 'robby';
    app.password = 'pwd';
    app.onLoginSubmit();
    expect(app.username).toEqual('robby');
  });
});
