import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionedInputComponent } from './versioned-input/versioned-input.component';
import { MatFormFieldModule, MatInputModule } from "@angular/material";

@NgModule({
  declarations: [VersionedInputComponent],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [VersionedInputComponent]
})
export class AupricoAuthAngularModule { }
