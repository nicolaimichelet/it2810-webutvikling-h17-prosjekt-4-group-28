import {Component, Inject, OnInit, Optional} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from "../../services/validate.service";
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MovieComponent} from "../movie-module/movie-module.component";
import {MovieDb} from "../../services/movies.service";
import {trigger, style, transition, animate, state, keyframes, query, stagger, animateChild} from "@angular/animations";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({opacity: 0}), animate('0.9s ease')])
    ]),
    trigger('stagger', [
      transition(':enter', [
        query('tr', stagger('0.15s', [animateChild()]), { optional: true } )
      ])
    ]),
    trigger('explainerAnim', [
      transition('* => *', [
        query('.col', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.col', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), { optional: true }),

        query('.col', [
          animate(1000, style('*'))
        ], { optional: true })

      ])
    ])

  ]
})
export class ProfileComponent implements OnInit {
  user:Object;
  favorites = [];
  dialogResult = '';
  showProfileInfo = false;
  //inject as dependencies
  constructor(
    public dialog: MatDialog,
    private movieDb: MovieDb,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router) {this.update(); this.items = ['Hey this is an item', 'Here is another one','This is awesome'];}

  //load profile on initialize
  ngOnInit() {


  }

  items = [];

  pushItem() {
    this.items.push('Oh yeah that is awesome');
  }
  removeItem() {
    this.items.pop();
  }



  update(){
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.favorites = profile.user.favorites;
        if ((this.favorites.length > 0)){
          this.showProfileInfo = false;
        }
        else {
          this.showProfileInfo = true;
        }
        console.log(this.favorites);
      },
      err => {
        console.log(err);
        return false;
      });

  }

  showInfo(favorite) : void {
    this.movieDb.specificMovie(favorite).then( movies => {
      let data = {
        '_id': movies._id,
        'Title': movies.Title,
        'Description': movies.Description,
        'Director': movies.Director,
        'Genre': movies.Genre,
        'Year': movies.Year,
        'Actors': movies.Actors
      };
      const dialog = this.dialog.open(MovieComponent, {
        data,
      });
      dialog.afterClosed().subscribe(result => {
        this.dialogResult = result;
        this.update();
      });
    });
  }


}
