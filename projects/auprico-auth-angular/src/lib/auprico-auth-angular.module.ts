import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionedInputComponent } from './versioned-input/versioned-input.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AupricoAuthAngularService } from './auprico-auth-angular.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [VersionedInputComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  exports: [VersionedInputComponent],
  providers: [AupricoAuthAngularService]
})
export class AupricoAuthAngularModule { }
