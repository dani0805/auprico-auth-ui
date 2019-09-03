
import gql from 'graphql-tag';

import {base64ToPK, BaseModel, parseArray, parseAttr, rProperty} from '../versioned-model';


export class BTeam extends BaseModel {
    @rProperty() id: string;
    @rProperty() code: string;
    @rProperty() name: string;
    @rProperty() timezoneCode: string;
    isActive = true;

    // relations
    parentTeam: BTeam;

    constructor(json: any) {
        super(json);
        this.init(json);
    }

    init(json: any) {
        this.parentTeam = parseAttr<BTeam>(json, BTeam, 'parentTeam');
    }

    pk(): number {
      if (!this.id) {
        return null;
      }
      return base64ToPK(this.id);
    }

    getMId() {
      return base64ToPK(this.id);
    }
    getMName() {
      return this.name;
    }
}

export const fragment = gql`
fragment teamFragment on TeamNode{
    id,
    code,
    name,
    timezoneCode
}`;

export const fragmentConnection = gql`
fragment teamConnectionFragment on TeamNodeConnection{
  edges{
    node{
      ...teamFragment
    }
  }
}${ fragment }`;

// team group, only needed for filters
export class BTeamGroupFilter extends BaseModel {
  @rProperty() id: string;
  @rProperty() name: string;
  isActive = true;

  // relations
  teams: BTeam[];

  constructor(json: any) {
      super(json);
      this.init(json);
      }

    init(json: any) {
      this.teams = parseArray<BTeam>(json, BTeam, 'teams');
  }

  getMId() {
    return base64ToPK(this.id);
  }

  getMName() {
    return this.name;
  }
}

export const groupFilterfragment = gql`
fragment teamGroupFilterFragment on TeamGroupFilterNode{
    id,
    name,
    teams {
      ...teamConnectionFragment
    }
}${ fragmentConnection }`;

export const groupFilterfragmentConnection = gql`
fragment teamGroupFilterConnectionFragment on TeamGroupFilterNodeConnection{
  edges{
    node{
      ...teamGroupFilterFragment
    }
  }
}${ groupFilterfragment }`;
