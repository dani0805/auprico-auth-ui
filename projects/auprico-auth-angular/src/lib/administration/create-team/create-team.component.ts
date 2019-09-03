import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Router} from '@angular/router';
import {BaseComponent} from '../../common/base-component/base-component.module';
import {BTeam} from "../../model/team/team";
import {TeamCreateService} from "../../model/team/team.service";


@Component({
  selector: 'lib-create-team-request',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent extends BaseComponent implements OnInit {

  _newTeam: BTeam;
  email: string;
  password: string;
  dialogRef: MatDialogRef<CreateTeamComponent>;

  constructor(
      private createTeamService: TeamCreateService,
      private router: Router
    ) {
      super();
    }

  ngOnInit() {
      this.newTeam = new BTeam({});
      this.safeSubscribe(this.createTeamService.response, team => {
        this.dialogRef.close();
        this.router.navigateByUrl('/administration/team/' + team.pk());
      });

  }

  set newTeam(team: BTeam) {
    this._newTeam = team;
  }

  get newTeam(): BTeam {
    return this._newTeam;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    // this.profileTeamComponent.save()
    const teamData = {
      name: this.newTeam.name,
      code: this.newTeam.code,
    };
    this.createTeamService.team.next(teamData);
  }

}
