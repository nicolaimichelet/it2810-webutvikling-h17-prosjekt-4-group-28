import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  username: String='';
  favorites: String[];
  isFavorite = false;
  showButton = false;

  constructor(public thisDialogRef: MatDialogRef<MovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private flashMessage: FlashMessagesService,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loggedIn()){
      this.showButton = true;
      this.authService.getProfile().subscribe(profile => {
          console.log(profile);
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
  console.log(this.username);
  console.log(this.data.Title);
    if (!this.isFavorite){
      console.log("Nå blir det liv")
      this.authService.setFavorites(this.username, this.data.Title).subscribe(data => {
        console.log(data);
        if (data.ok) {
          this.isFavorite = true;
        }
      });
    }
    else {
      console.log("nå skal det slettes")
      this.authService.removeFavorites(this.username, this.data.Title).subscribe(data=> {
        console.log("hello");
        this.isFavorite = false;
      });
    }

  }
}
