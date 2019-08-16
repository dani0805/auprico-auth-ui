import {Injectable, Injector} from '@angular/core';

import gql from 'graphql-tag';
import * as MLanguage from './language';
import {BaseDataService} from "../data-service";

const getAllLanguages = gql`
  query getAllLanguages{
    allLanguages{
      ...languageConnectionFragment
    }
  }
  ${ MLanguage.fragmentConnection }`;


@Injectable()
export class LanguageService extends BaseDataService<MLanguage.BLanguage> {
    query = getAllLanguages;
    objectInstance = new MLanguage.BLanguage({});
    fieldName = 'allLanguages';

    constructor(injector: Injector) {
        super(injector);
    }

}
