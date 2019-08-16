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
fragment phoneFragment on PhoneNode {
    id,
    label,
    val,
    isMain,
    createdTs,
    editedTs,
    isDeleted,
    importedId,
    importedSource,
    importedTs
}
`;

export const fragmentNew = gql`
fragment newPhoneFragment on NewPhoneNode {
    id,
    label,
    val,
    isMain,
    isDeleted,
}
`;

export const fragmentRevision = gql`
fragment phoneRevisionFragment on RevisionPhoneNode {
    id,
    label,
    val,
    isMain,
    createdTs,
    editedTs,
    isDeleted,
}
`;

export const fragmentConnection = gql`
fragment phoneConnectionFragment on PhoneNodeConnection {
  edges {
    node {
      ...phoneFragment
    }
  }
}
${ fragment }
`;

export const fragmentNewConnection = gql`
fragment newPhoneConnectionFragment on NewPhoneNodeConnection {
  edges {
    node {
      ...newPhoneFragment
    }
  }
}
${ fragmentNew }
`;

export const fragmentRevisionConnection = gql`
fragment phoneRevisionConnectionFragment on RevisionPhoneNodeConnection {
  edges {
    node {
      ...phoneRevisionFragment
    }
  }
}
${ fragmentRevision }
`;
