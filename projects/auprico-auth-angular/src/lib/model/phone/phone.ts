import gql from 'graphql-tag';
import {BaseModel, rProperty} from '../versioned-model';


export class BPhone extends BaseModel {
    @rProperty() id: string;
    @rProperty() label: string;
    @rProperty() val: string;
    @rProperty() isMain: boolean;
    @rProperty() isDeleted: boolean;
    @rProperty(Date) createdTs: Date;
    @rProperty(Date) editedTs: Date;
    @rProperty() importedId: string;
    @rProperty() importedSource: string;
    @rProperty(Date) importedTs: string;

    edit = false;


    constructor(json: any) {
        super(json);
        this.init(json);
    }

    init(json: any) {
        if (!json) {
          this.val = '';
        }
        for (const field of ['isMain', 'isDeleted']) {
          if (json[field] == 'TRUE') {
            this[field] = true;
          } else {
            this[field] = false;
          }
        }
    }
}

// fragments will contain only actual values of the object, no references to other tables
export const fragment = gql`
fragment phoneFragment on UserPhoneNode {
  id
  label
  value
  isMain
  createdTs
  editedTs
  isDeleted
}
`;

export const fragmentConnection = gql`
fragment phoneConnectionFragment on UserPhoneNodeConnection {
  edges {
    node {
      ...phoneFragment
    }
  }
}
${ fragment }
`;
