import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionedInputComponent } from './versioned-input/versioned-input.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AupricoAuthAngularService } from './auprico-auth-angular.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { UrlResolverService } from './url-resolver.service';
import {SingleUserService} from './model/user/user.service';

@NgModule({
  declarations: [VersionedInputComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
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
    SingleUserService
  ]
})

export class AupricoAuthAngularModule { }
