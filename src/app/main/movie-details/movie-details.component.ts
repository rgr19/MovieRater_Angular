import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/Movie';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie = null;
  @Output() movieSelector = new EventEmitter<Movie>();
  rateHovered = 0;

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
  }

  rateHover(rate: number) {
    console.log('Rate hovered', rate);
    this.rateHovered = rate;
  }

  rateClick(rate: number) {
    console.log('Movie rate clicked', rate);
    this.apiService.rateMovie(this.movie.id, rate).subscribe(
      result => {
        console.log('Backend output of set movie rating: ', result);
        this.getDetails();
      },
      error => console.log(error)
    );
  }

  getDetails() {
    console.log('Get details of movie', this.movie.id);
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        console.log('Backend output of get movie details: ', movie);
        this.movieSelector.emit(movie);
      },
      error => console.log(error)
    );
  }

}
