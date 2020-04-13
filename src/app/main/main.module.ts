import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieFormComponent} from './movie-form/movie-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        AngularFontAwesomeModule,
        ReactiveFormsModule
    ]
})
export class MainModule {

}
