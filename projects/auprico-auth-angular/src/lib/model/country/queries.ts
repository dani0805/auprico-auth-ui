import gql from 'graphql-tag';
import * as MCountry from './country';

const allCountriesQuery = gql`
query allCountriesQuery {
  allCountries {
    ...countryConnectionFragment
    }
  }
${ MCountry.fragmentConnection }
`;

export {allCountriesQuery}