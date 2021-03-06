import { NgModule } from '@angular/core';
import { VersionedInputComponent } from './versioned-input/versioned-input.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AupricoAuthAngularService } from './auprico-auth-angular.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { UrlResolverService } from './url-resolver.service';
import {SingleUserService, UserEditPasswordService} from './model/user/user.service';

@NgModule({
  declarations: [VersionedInputComponent, LoginComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    VersionedInputComponent,
    LoginComponent
  ],
  providers: [
    AupricoAuthAngularService,
    UrlResolverService,
    SingleUserService,
    UserEditPasswordService
  ]
})

export class AupricoAuthAngularModule { }
