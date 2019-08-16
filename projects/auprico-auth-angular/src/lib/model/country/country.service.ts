import {Injectable, Injector} from '@angular/core';

import {BCountry} from './country';
import {allCountriesQuery} from './queries';
import {BaseDataService} from "../data-service";

@Injectable()
export class CountryService extends BaseDataService<BCountry> {
    query = allCountriesQuery;
    objectInstance = new BCountry({});
    fieldName = 'allCountries';

    constructor(injector: Injector) {
        super(injector);
    }

}
