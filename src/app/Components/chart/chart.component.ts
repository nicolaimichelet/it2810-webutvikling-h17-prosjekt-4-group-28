import {Component, Input, OnInit} from '@angular/core';
import {MovieDb} from "../../services/movies.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})



export class ChartComponent implements OnInit {

  @Input() searchString: string;
  @Input() genreString: string;
  @Input() ratingNumber: number;
  movieRatings: any[];
  panelOpenState = true;

  constructor(public movieDb: MovieDb) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    if (this.panelOpenState){
      this.countMovieRatings();
    }
  }



  public countMovieRatings(): void {
  this.movieDb.getMovieRatings(this).then(movieRatings => {
  this.movieRatings = movieRatings;
  console.log(movieRatings);
  let clone = JSON.parse(JSON.stringify(this.barChartData));
  const newValues = new Array(10).fill(0);
  for (const key in movieRatings){
    newValues[movieRatings[key]._id-1] = movieRatings[key].count
    console.log(key)
  }
  clone[0].data = newValues;
    this.barChartData = clone;
  console.log(newValues);
});
}

  public chartColors: any[] = [
    {
      backgroundColor:["#5bc0de"]
    }];


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['1', '2', '3', '4', '5', '6', '7', '8','9','10'];
  public lineChartType:string = 'line';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40,30,22,69], label: 'Movies'},
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
