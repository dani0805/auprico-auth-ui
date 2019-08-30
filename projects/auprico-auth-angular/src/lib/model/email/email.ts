import gql from 'graphql-tag';
import {BaseModel, rProperty} from '../versioned-model';

export class BEmail extends BaseModel {
    @rProperty() id: string;
    @rProperty() label: string;
    @rProperty() value: string;
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
          this.value = '';
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
fragment emailFragment on UserEmailNode {
    id,
    label,
    value,
    isMain,
    createdTs,
    editedTs,
    isDeleted
}
`;


export const fragmentConnection = gql`
fragment emailConnectionFragment on UserEmailNodeConnection {
  edges {
    node {
      ...emailFragment
    }
  }
}
${ fragment }
`;

