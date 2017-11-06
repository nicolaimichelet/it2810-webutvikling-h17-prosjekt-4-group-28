
import {MatSort} from "@angular/material";
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {MovieData, MoviesComponent} from "./movies.component";


export class ExampleDataSource extends DataSource<any> {
  constructor(private _MoviesComponent: MoviesComponent, private _paginator: MatPaginator, private _sort: MatSort) {
    super();
  }
  disconnect$ = new Subject();

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  _togglChange = new BehaviorSubject('');
  get toggl(): string {return this._togglChange.value; }
  set toggl(toggl: string) { this._togglChange.next(toggl);}
  _ratingChange = new BehaviorSubject(0);
  get rating(): number {return this._ratingChange.value; }
  set rating(rating: number) { this._ratingChange.next(rating); }


  length: number;
  connect(): Observable<MovieData[]> {
    console.log("connect");
    const displayDataChanges = [
      this._MoviesComponent.dataChange,
      this._paginator.page,
      this._filterChange,
      this._sort.sortChange,
      this._togglChange,
      this._ratingChange

    ];

    this._filterChange
      .takeUntil(this.disconnect$)
      .subscribe(() => this.resetPaginator());

    this._togglChange
      .takeUntil(this.disconnect$)
      .subscribe(() => this.resetPaginator());

    this._ratingChange
      .takeUntil(this.disconnect$)
      .subscribe(() => this.resetPaginator());


    return Observable
      .merge(...displayDataChanges)
      .takeUntil(this.disconnect$)
      .map(() => this.getFreshData())
      .map((data) => this.getFilteredData(data))
      .map((data) => this.getToggledData(data))
      .map(data => this.getSortedData(data))
      .map(data => this.getRatingData(data))
      .do(data => this.setLength(data))
      .map(data => this.paginate(data));
  }

  resetPaginator() {
    return this._paginator.pageIndex = 0;
  }

  getFreshData() {
    return this._MoviesComponent.data.slice();
  }

  getFilteredData(data) {
    if (this.filter === '') {
      return data;
    }
    return data.filter((item: MovieData) => {
      const searchStr = (item.Title.toString().toLowerCase());
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
  }
  getToggledData(data) {
    if (this.toggl === '') {
      return data;
    }
    return data.filter((item: MovieData) => {
      const searchStr = (item.Genre.toString().toLocaleLowerCase());
      return searchStr.indexOf(this.toggl.toLowerCase()) !== -1;
    });
  }
  getRatingData(data) {
    return data.sort(function (a, b) {
      return a - b;
    }).filter((item: MovieData) => {
      return item.Rating > this.rating;
    });
  }

  paginate(data) {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }

  setLength(data) {
    return this.length = data.length;
  }

  getSortedData(data): MovieData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Title':
          [propertyA, propertyB] = [a.Title, b.Title];
          break;
        case 'Year':
          [propertyA, propertyB] = [a.Year, b.Year];
          break;
        case 'Genre':
          [propertyA, propertyB] = [a.Genre, b.Genre];
          break;
        case 'Rating':
          [propertyA, propertyB] = [parseFloat(b.Rating), parseFloat(a.Rating)];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() {
    this.disconnect$.next(true);
    this.disconnect$.complete();
  }
}
