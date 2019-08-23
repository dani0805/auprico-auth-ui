import gql from 'graphql-tag';
import {BaseModel, parseArray, rProperty} from '../versioned-model';
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

      this.emails = parseArray<BEmail>(json, BEmail, 'emails');
      this.phones = parseArray<BPhone>(json, BPhone, 'phones');
      this.addresses = parseArray<BAddress>(json, BAddress, 'addresses');

      if (this.phones.length == 0) {
        this.phones = [new BPhone('')];
      }
      if (this.emails.length == 0) {
        this.emails = [new BEmail('')];
      }
      if (this.addresses.length == 0) {
        this.addresses = [new BAddress('')];
      }
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
