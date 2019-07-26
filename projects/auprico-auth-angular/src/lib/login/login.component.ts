import { Component, OnInit } from '@angular/core';
import {AupricoAuthAngularService} from '../auprico-auth-angular.service';

@Component({
  selector: 'lib-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private authenticationService: AupricoAuthAngularService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(data => {
            if (data === true) {
                // login successful
                // this.router.navigate(['/']);
                // TODO handle with Angular Router
                // window.location.href = '/';
                // this.router.navigate(['inq','list']);
                // used reloading otherwise app component it is not loaded properly and subscription
                // for user does not work... to be reviewed
                // window.location.href = '/'
            } else {
                // login failed
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        },
        err => {
            // HTTP 400 is returned when credentials are wrong (JSONWebTokenSerializer)
            this.error = 'Username or password is incorrect';
            this.loading = false;
        });
  }
}
