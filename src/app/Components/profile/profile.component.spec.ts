import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from "../../services/validate.service";
import { RouterTestingModule } from '@angular/router/testing';
import {FlashMessagesService} from "angular2-flash-messages";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material";
import {MovieComponent} from "../movie/movie.component";
import {MovieDb} from "../../services/movies.service";
import { ProfileComponent } from './profile.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {HttpModule} from "@angular/http";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule,HttpModule, HttpClientModule],
      declarations: [ ProfileComponent,
                      MovieComponent ],
      providers: [MovieDb, HttpClient, HttpHandler, ValidateService, AuthService, FlashMessagesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
