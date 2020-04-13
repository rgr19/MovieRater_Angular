import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Movie} from '../models/Movie';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Store} from '../models/Store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  movies: Store<Movie> = new Store<Movie>();
  selectedMovie = null;
  editedMovie: any;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngDoCheck() {
    console.log('NG DO CHECK');
    this.checkAuth();
  }
  checkAuth() {
    console.log('Main component check auth');
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit() {
    console.log('NG ON INIT BEGIN');
    this.apiService.getMovies().subscribe(
      (movies: Movie[]) => {
        movies.map((m: Movie) => {
          this.movies.put(m.id, m);
        });
        console.log('Main new movies (obs): ', this.movies);

      },
      error => console.log(error)
    );
    console.log('Main new movies: ', this.movies);
    console.log('NG ON INIT END');
  }


  logout() {
    this.cookieService.delete('mr-token');
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editedMovie = null;
    console.log('Select movie: ', movie);
  }

  editMovie(movie: Movie) {
    this.editedMovie = movie;
    this.selectedMovie = null;
    console.log('Edit movie: ', movie);
  }

  createMovie(movie: Movie = null) {
    console.log('MAIN create movie: ', movie);
    if (movie) {
      this.movies.put(movie.id, movie);
    }
    this.editedMovie = {} as Movie;
    this.selectedMovie = null;
  }

  updateMovie(movie: Movie) {
    console.log('Main movie update : ', movie);
    // this.movies[movie.id] = movie;
    this.movies.put(movie.id, movie);
    this.editedMovie = {} as Movie;
    this.selectedMovie = null;
  }

  deleteMovie(movie: Movie) {
    console.log('Delete movie: ', movie);
    this.apiService.deleteMovie(movie).subscribe(
      data => {
        this.movies.delete(movie.id);
      },
      error => console.log('Delete movie END, error: ', error)
    );
  }

}
