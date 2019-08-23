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
              window.location.href = '/batch/list';
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
