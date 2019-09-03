import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamProfileComponent } from './team-profile.component';
import {MatTabsModule} from '@angular/material';
import {ICommonModule} from '../common/common.module';
import {TeamProfileInfoComponent} from './team-profile-info/team-profile-info.component';
import {TeamRoutingModule} from './team-profile-routing.module';
import {SingleTeamService, TeamEditService} from '../model/team/team.service';

@NgModule({
  imports: [
    CommonModule,
    ICommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    MatTabsModule
  ],
    declarations: [
      TeamProfileComponent,
      TeamProfileInfoComponent
    ],
    providers: [
      SingleTeamService,
      TeamEditService
    ],
    entryComponents: [
    ],
  })
  export class TeamProfileModule { }

