import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {BaseComponent} from '../../common/base-component/base-component.module';
import {BUser} from '../../model/user/user';
import {UserCreateService} from '../../model/user/user.service';


@Component({
  selector: 'lib-create-user-request',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent extends BaseComponent implements OnInit {

  _newUser: BUser;
  email: string;
  password: string;
  dialogRef: MatDialogRef<CreateUserComponent>;

  constructor(
      private createUserService: UserCreateService,
      private router: Router
    ) {
      super();
    }

  ngOnInit() {
      this.newUser = new BUser({});
      this.safeSubscribe(this.createUserService.response, user => {
        this.dialogRef.close();
        this.router.navigateByUrl('/administration/user/' + user.pk());
      });

  }

  set newUser(user: BUser) {
    this._newUser = user;
  }

  get newUser(): BUser {
    return this._newUser;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    // this.profileTeamComponent.save()
    const userData = {
      username: this.newUser.username,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.email,
      password: this.password
    };
    this.createUserService.user.next(userData);
  }

}
