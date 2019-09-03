import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BaseComponent} from '../../common/base-component/base-component.module';
import {BTeam} from '../../model/team/team';
import {TeamEditService} from "../../model/team/team.service";

@Component({
  selector: 'lib-team-profile-info',
  templateUrl: './team-profile-info.component.html',
  styleUrls: ['./team-profile-info.component.scss']
})



export class TeamProfileInfoComponent extends BaseComponent implements OnInit {
  _team: BTeam;

  // search handler
  searchGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });


  get team(): BTeam {
    return this._team;
  }

  @Input() set team(team: BTeam) {
    this._team = team;
  }

  constructor(private teamEditService: TeamEditService
  ) {
      super();
  }

  ngOnInit() {

    this.safeSubscribe(this.teamEditService.response, changedTeam => {
      this.team = changedTeam;
    });
  }

  allowSave(team: BTeam): boolean {
    if (!team) {
      return false;
    }
    // check errors in form controls
    for(let key in this.searchGroup.controls){
      if(this.searchGroup.controls[key].hasError('required')){
        return false;
      }
    }
  }

  save() {
    const data = {};
    const fields = ['id', 'name', 'code'];
    for (const field of fields) {
      data[field] = this.team[field];
    }

    this.saveAsEdit(data);
  }

  saveAsEdit(data: Object) {
    this.teamEditService.editTeam(data);
  }

}
