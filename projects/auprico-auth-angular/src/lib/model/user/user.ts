import { BaseModel, rProperty } from '../versioned-model';
import gql from 'graphql-tag';

export class BUser extends BaseModel {
    @rProperty() id: string;
    @rProperty() firstName: string;
    @rProperty() lastName: string;
    @rProperty() username: string;
    @rProperty(Date) createdTs: string;

    constructor(json: any) {
        super(json);
        this.init(json);
    }

    init(json: any) {
    }
}

export const fragment = gql`
  fragment userFragment on UserNode {
    id,
    firstName,
    lastName
  }
`;
