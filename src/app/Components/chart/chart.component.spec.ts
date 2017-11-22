import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import {MatExpansionModule} from "@angular/material";
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import { ChartsModule } from 'ng2-charts';
import 'chart.js'
import {HttpHandler} from "@angular/common/http";
import {MovieDb} from "../../services/movies.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatExpansionModule,HttpModule, HttpClientModule, ChartsModule, BrowserAnimationsModule],
      declarations: [ ChartComponent ],
      providers: [MovieDb, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
