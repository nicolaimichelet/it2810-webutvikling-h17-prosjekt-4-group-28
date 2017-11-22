import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-module.component.html',
  styleUrls: ['./movie-module.component.css']
})
export class MovieComponent implements OnInit{

  username: String='';
  favorites: String[];
  isFavorite = false;
  showButton = false;

  constructor(public thisDialogRef: MatDialogRef<MovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.loggedIn()){
      this.showButton = true;
      this.authService.getProfile().subscribe(profile => {
          this.username = profile.user.username;
          this.favorites = profile.user.favorites;
          if (this.favorites.includes(this.data.Title)){
            this.isFavorite = true;
          }
        },
        err => {
          console.log(err);
          return false;
        });
    }
    else {
        this.showButton = false;
    }
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }


  onFavorite (){

    if (!this.isFavorite){
      this.authService.setFavorites(this.username, this.data.Title).subscribe(data => {
        if (data.ok) {
          this.isFavorite = true;
        }
      });
    }
    else {
      this.authService.removeFavorites(this.username, this.data.Title).subscribe(data=> {
        this.isFavorite = false;
      });
    }

  }
}
