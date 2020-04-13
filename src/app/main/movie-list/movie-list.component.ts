import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/Movie';
import {Store} from '../../models/Store';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {

  @Input() movies: Store<Movie> = new Store<Movie>();
  @Output() movieSelector = new EventEmitter<Movie>();
  @Output() movieEditor = new EventEmitter<Movie>();
  @Output() movieDeleter = new EventEmitter<Movie>();
  @Output() movieCreator = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log('Movie List => Movie List new movies: ', this.movies);
  }

  movieClicked(idx: number) {
    const movie = this.movies.get(idx);
    console.log('Movie List => Movie clicked: ', movie);
    this.movieSelector.emit(movie);
  }

  editMovie(idx: number) {
    const movie = this.movies.get(idx);
    console.log('Movie List => Edit movie: ', movie);
    this.movieEditor.emit(movie);
  }

  newMovie() {
    console.log('Movie List => New movie: ');
    this.movieCreator.emit();
  }

  deleteMovie(idx: number) {
    const movie = this.movies.get(idx);
    console.log('Movie List => delete movie: ', movie);
    this.movieDeleter.emit(movie);
  }

  getMovieTitle(idx: number) {
    const movie = this.movies.get(idx);
    console.log('Movie List => Get movie(%s) of idx(%s)', movie, idx);
    if (movie !== undefined) {
      return movie.title;
    }
  }
}
