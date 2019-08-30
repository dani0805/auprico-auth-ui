import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { UserRoutingModule } from './user-profile-routing.module';
import { UserProfileContactsComponent } from './user-profile-contacts/user-profile-contacts.component';
import {MatTabsModule} from '@angular/material';
import {ICommonModule} from '../common/common.module';
import {AupricoAuthAngularModule} from '../auprico-auth-angular.module';
import {UserAddressComponent} from './user-address/user-address.component';
import {UserPasswordResetComponent} from './user-password-reset/user-password-reset.component';

@NgModule({
  imports: [
    CommonModule,
    ICommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatTabsModule,
    AupricoAuthAngularModule
  ],
    declarations: [
      UserProfileComponent,
      UserProfileContactsComponent,
      UserAddressComponent,
      UserPasswordResetComponent
    ],
    providers: [],
    entryComponents: [
    ],
  })
  export class UserProfileModule { }

