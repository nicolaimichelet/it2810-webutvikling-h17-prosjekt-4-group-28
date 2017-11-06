import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  constructor(public thisDialogRef: MatDialogRef<MovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }


}
