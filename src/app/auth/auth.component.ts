import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = new FormGroup(
    {
      username: new FormControl(),
      password: new FormControl()
    }
  );
  registerMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    console.log('Auth componenent INIT, token: ', mrToken);
  }

  formDisabled() {
    if (this.authForm.value.username === null) {
      return true;
    }
    return this.authForm.value.password === null;
  }

  authenticate() {
    if (this.registerMode) {
      this.signUp();
    } else {
      this.signIn();
    }
  }

  signIn() {
    console.log('Sign IN BEGIN with', this.authForm.value);
    this.apiService.signInUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        console.log('Sign IN END with out: ', this.authForm.value, result);
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/main']);
      },
      error => {
        console.log('Sign IN END with error: ', this.authForm.value, error);
        this.router.navigate(['/auth']);
      }
    );
  }

  signUp() {
    console.log('Sign UP BEGIN with', this.authForm.value);
    this.apiService.signUpUser(this.authForm.value).subscribe(
      (result) => {
        console.log('Sign UP END with out: ', this.authForm.value, result);
        this.registerMode = false;
      },
      error => {
        console.log('Sign UP END with error: ', this.authForm.value, error);
      }
    );
    this.router.navigate(['/auth']);
  }


}
