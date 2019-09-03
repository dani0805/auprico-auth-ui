import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationTeamsComponent } from './administration-teams.component';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { ICommonModule } from '../../common/common.module';

@NgModule({
    imports: [
      CommonModule,
      ICommonModule,
      FormsModule,
      ReactiveFormsModule

    ],
    declarations: [
      AdministrationTeamsComponent,
      CreateTeamComponent],
    exports: [],
    providers: [],
    entryComponents: [CreateTeamComponent],
  })
  export class AdministrationTeamsModule { }

