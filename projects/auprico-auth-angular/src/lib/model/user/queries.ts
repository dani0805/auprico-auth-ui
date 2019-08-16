import gql from 'graphql-tag';

import * as MUser from './user';
import * as MLanguage from '../language/language';


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
        language {
          ...languageFragment
        }
      }
    }
}
${ MUser.fragment }
${ MLanguage.fragment }
`;

export const singleUserQuery = gql`
  query singleUser($id: ID!) {
    user(id: $id) {
      ...userFragment
    }
  }
  ${ MUser.fragment }
  `;
