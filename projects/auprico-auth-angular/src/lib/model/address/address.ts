import gql from 'graphql-tag';
import {BaseModel, parseAttr, rProperty} from '../versioned-model';
import {BCountry} from '../country/country';


export class BAddress extends BaseModel {
    @rProperty() id: string;
    @rProperty() label: string;
    @rProperty() address1: string;
    @rProperty() address2: string;
    @rProperty() city: string;
    @rProperty() zipCode: string;
    @rProperty() state: string;
    @rProperty() isMain: boolean;
    @rProperty() isDeleted: boolean;
    @rProperty(Date) createdTs: Date;
    @rProperty(Date) editedTs: Date;
    @rProperty() importedId: string;
    @rProperty() importedSource: string;
    @rProperty(Date) importedTs: string;

    country: BCountry;
    edit = false;

    constructor(json: any) {
        super(json);
        this.init(json);
    }

    init(json: any) {
        this.country = parseAttr<BCountry>(json, BCountry, 'country');
        if (!json) {
          this.address1 = '';
        }
        for (const field of ['isMain', 'isDeleted']) {
          if (json[field] == 'TRUE') {
            this[field] = true;
          } else {
            this[field] = false;
          }
        }
    }

    get addressDescription() {
      let description = '';
      if (this.address1) { description += this.address1; }
      if (this.address2) { description += ', ' + this.address2; }
      if (this.city) { description += ', ' + this.city; }
      if (this.zipCode) { description += ', ' + this.zipCode; }
      if (this.state) { description += ', ' + this.state; }
      return description;
    }
}

export const fragment = gql`
fragment addressFragment on UserAddressNode {
    id
    label
    address1
    address2
    city
    state
    zipCode
    isMain
    createdTs
    editedTs
    isDeleted
}
`;

export const fragmentConnection = gql`
fragment addressConnectionFragment on UserAddressNodeConnection {
  edges {
    node {
      ...addressFragment
    }
  }
}
${ fragment }
`;
