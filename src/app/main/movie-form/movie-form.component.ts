import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/Movie';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm: FormGroup;
  movieId: number;

  @Output() movieCreator = new EventEmitter<Movie>();
  @Output() movieUpdater = new EventEmitter<Movie>();

  @Input() set movie(m: Movie) {
    this.movieId = m.id;
    this.movieForm = new FormGroup(
      {
        id: new FormControl(m.id),
        title: new FormControl(m.title),
        description: new FormControl(m.description)
      }
    );
  }

  constructor(private apiService: ApiService) {
    console.log('Movie Form construct: ', this.movie);
  }

  ngOnInit() {
    console.log('Movie Form init: ', this.movie);
  }

  saveForm() {
    console.log('Save movie form BEGIN, input: ', this.movieForm.value);
    if (this.movieId) {
      this.apiService.putMovie(this.movieForm.value).subscribe(
        (result: Movie) => {
          console.log('Save movie form END, put out: ', result);
          this.movieUpdater.emit(result);
        },
        error => console.log('Save movie form END, put error:', error)
      );
    } else {
      this.apiService.postMovie(this.movieForm.value).subscribe(
        (result: Movie) => {
          console.log('Save movie form END, post out: ', result);
          this.movieCreator.emit(result);
        },
        error => console.log('Save movie form END, post error:', error)
      );
    }
  }

  formDisabled() {
    console.log('Movie form disabled for:', this.movieForm.value);
    if (this.movieForm.value.title === null) {
      return true;
    }
    return this.movieForm.value.description === null;
  }

}
