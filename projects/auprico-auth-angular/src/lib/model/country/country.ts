import gql from 'graphql-tag';

import {BLanguage} from '../language/language';
import {base64ToPK, BaseModel, parseAttr, rProperty} from '../versioned-model';

export class BCountry extends BaseModel {
    isActive = true;
    @rProperty() id: string;
    @rProperty() name: string;
    @rProperty() code: string;
    @rProperty() timezoneCode: string;
    @rProperty() externalDpt: boolean;

    defaultLanguage: BLanguage;

    constructor(json: any) {
        super(json);
        this.init(json);
    }

    init(json: any) {
        // manually deserialize relations
        this.defaultLanguage = parseAttr<BLanguage>(json, BLanguage, 'defaultLanguage');
    }

    getMId() {
        return base64ToPK(this.id);
    }

    getMName() {
        return this.name;
    }
}


export const fragment = gql`
  fragment countryFragment on CountryNode {
    id,
    name,
    code,
    timezoneCode,
    externalDpt
  }
`;

export const fragmentConnection = gql`
  fragment countryConnectionFragment on CountryNodeConnection {
    edges {
      node {
        ...countryFragment
      }
    }
  }
  ${ fragment }
`;
