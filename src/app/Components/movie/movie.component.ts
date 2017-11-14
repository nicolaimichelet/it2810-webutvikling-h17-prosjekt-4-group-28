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

  constructor(public thisDialogRef: MatDialogRef<MovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private flashMessage: FlashMessagesService,
              private authService: AuthService) { }

  ngOnInit() {
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

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }


  onFavorite (){
    //change icon?
  console.log(this.username);
  console.log(this.data.Title);
    this.isFavorite = true;
    this.authService.setFavorites(this.username, this.data.Title).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Succesfully added to favorites', {cssClass: 'alert-success', timeout: 2000});
      }
    });



  }
}
