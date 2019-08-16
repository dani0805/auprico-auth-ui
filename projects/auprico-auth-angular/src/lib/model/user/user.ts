import gql from 'graphql-tag';
import {BaseModel, rProperty} from '../versioned-model';
import {BLanguage} from '../language/language';
import {BEmail} from '../email/email';
import {BPhone} from '../phone/phone';
import {BAddress} from '../address/address';

export class BUser extends BaseModel {
  @rProperty() id: string;
  @rProperty() firstName: string;
  @rProperty() lastName: string;
  @rProperty() username: string;
  @rProperty(Date) createdTs: string;

  language: BLanguage;
  emails: BEmail[];
  phones: BPhone[];
  addresses: BAddress[];

  constructor(json: any) {
      super(json);
      this.init(json);
  }

  init(json: any) {
  }

  fullName(): string {
    const comp = [this.firstName, this.lastName];
    return comp.filter(str => !!str).join(' ');
  }
}

export const fragment = gql`
  fragment userFragment on UserNode {
    id,
    username,
    firstName,
    lastName
  }
`;

export const titleChoices = [
  ['', ''],
  ['Dr.', 'Dr.'],
  ['PhD', 'PhD'],
  ['Prof.', 'Prof.'],
  ['Prof. Dr.', 'Prof. Dr.']
];

export const genderChoices = [
  ['', ''],
  ['male', 'Mr.'],
  ['female', 'Mrs.']
];
