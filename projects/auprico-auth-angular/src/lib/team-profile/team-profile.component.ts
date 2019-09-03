import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';
import {BaseComponent} from '../common/base-component/base-component.module';
import {BTeam} from '../model/team/team';
import {SingleTeamService} from '../model/team/team.service';

@Component({
    selector: 'lib-team-profile',
    templateUrl: './team-profile.component.html',
    styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent extends BaseComponent implements OnInit {
    team: BTeam;
    _teamId: number;

    mode = 'team';

    isPersonalSettings = false;
    isRefreshingAuth = false;

    set teamId(value: number) {
      this._teamId = value;
      if (this._teamId) {
        this.singleTeamService.performQueryWithID(this._teamId);
      }
    }

    constructor(private singleTeamService: SingleTeamService,
                private route: ActivatedRoute,
                private matDialog: MatDialog) {
        super();
    }

    ngOnInit() {
        this.safeSubscribe(this.singleTeamService.team, t => {
          console.log("TEAM: "+t);
          if (!t) {
              return;
          }
          this.team = t;
        });

        this.route.params.subscribe(params => {
            if (params.id) {
                this.teamId = parseInt(params.id);
            }
            if (this.teamId) {
              this.singleTeamService.performQueryWithID(this.teamId);
            }
        });
    }

}
