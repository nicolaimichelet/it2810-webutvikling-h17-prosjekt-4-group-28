import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from "../../services/validate.service";
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {MovieComponent} from "../movie/movie.component";
import {MovieDb} from "../../movies.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  favorites = [];
  dialogResult = '';
  //inject as dependencies
  constructor(
    public dialog: MatDialog,
    private movieDb: MovieDb,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  //load profile on initialize
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.favorites = profile.user.favorites;
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
      });
    });
  }


}
