import gql from 'graphql-tag';
import {BaseModel, rProperty} from '../versioned-model';


export class BLanguage extends BaseModel {
  @rProperty() id: string;
  @rProperty() name: string;
  @rProperty() code: string;

  isActive = true;


  init(json: any) {

  }
}

export const fragment = gql`
  fragment languageFragment on Language {
    id,
    name,
    code
  }
`;

export const fragmentConnection = gql`
  fragment languageConnectionFragment on LanguageConnection{
    edges{
      node{
        ...languageFragment
      }
    }
  }
  ${ fragment }
`;
