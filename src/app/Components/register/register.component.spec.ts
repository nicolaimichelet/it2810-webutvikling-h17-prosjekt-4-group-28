import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";
import {HttpModule} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, FlashMessagesModule, HttpModule, RouterTestingModule],
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
});
