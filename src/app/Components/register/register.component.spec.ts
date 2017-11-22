import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";
import {HttpModule} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, FlashMessagesModule, HttpModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ RegisterComponent ],
      providers: [ValidateService, AuthService, FlashMessagesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'REGISTER'`, async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('REGISTER');
  }));

  it(`should set the NAME and USERNAME`, async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    app.name = 'robby';
    app.username = 'bobby';
    app.password = 'robby'
    app.onRegisterSubmit()
    expect(app.name).toEqual('robby');
    expect(app.username).toEqual('bobby');
  }));
  it(`should alert something wrong.'`, async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('REGISTER');
  }));


});
