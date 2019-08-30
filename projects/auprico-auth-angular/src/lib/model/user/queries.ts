import * as MUser from './user';
import * as MLanguage from '../language/language';
import * as MEmail from '../email/email';
import * as MPhone from '../phone/phone';
import * as MAddress from '../address/address';
import * as MCountry from '../country/country';

import gql from 'graphql-tag';


export const userQuery = gql`
query FilterUserQuery($filters: String!, $size: Int, $thCursor: String) {
    filterUser(first: $size, after: $thCursor, jsonFilter: $filters) {
        totalCount
        pageInfo {
            startCursor
            endCursor
        },
        edges {
            node {
              ...userFragment
            }
        }
    }
} ${ MUser.fragment }`;


export const createUser = gql`
mutation CreateUser($params: CreateUserInput!) {
  createUser(input: $params){
    user {
        ...userFragment
        }
    }
}
${ MUser.fragment }
`;

export const mutateUser = gql`
mutation updateUser($params:UpdateUserInput!) {
    updateUser(input:$params){
        user {
        ...userFragment,
        gender,
        title,
        language {
          ...languageFragment
        },
        emails {
          ...emailConnectionFragment
        },
        phones {
          ...phoneConnectionFragment
        },
        addresses {
          edges {
            node {
              ...addressFragment
              country {
                ...countryFragment
              }
            }
          }
        }
      }
    }
}
${ MUser.fragment }
${ MLanguage.fragment }
${ MEmail.fragmentConnection }
${ MPhone.fragmentConnection }
${ MAddress.fragment }
${ MCountry.fragment }
`;

export const singleUserQuery = gql`
  query singleUser($id: ID!) {
    user(id: $id) {
      ...userFragment
    }
  }
  ${ MUser.fragment }
  `;


export const mutateUserPassword = gql`
mutation updateUserPassword($params:UpdateUserPasswordInput!) {
    updateUserPassword(input:$params){
        user {
          id,
          firstName,
          lastName,
          username,
          password
      },
    }
}
`;
