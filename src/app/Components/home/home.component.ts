import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,state,keyframes,query,stagger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [


        state('in', style({transform: 'translateY(0)'})),
        transition('void => *', [
          style({transform: 'translateY(-100%)'}),
          animate('1s ease-in')
        ]),

       transition(':enter', [style({opacity: 0}), animate('3s ease')]),

        transition(':enter', [
          animate('1s ease-in', style({transform: 'translateY(100%)'}))
        ])

      ])
  ]
})

export class HomeComponent implements OnInit {

  public backgroundImageUrl(){
    return '../../../assets/background-image.jpg';
  }

  constructor() { }

  ngOnInit() {
  }

}
