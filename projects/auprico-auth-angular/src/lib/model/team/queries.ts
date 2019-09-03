import gql from 'graphql-tag';
import * as MTeam from './team';
import * as MUser from "../user/user";

export const getAllTeams = gql`
    query getAllTeams{
        allTeams{
            edges {
                node {
                    ...teamFragment
                }
            }

        }
    }
    ${ MTeam.fragment }`;


export const getAllTeamGroupFilters = gql`
    query getAllTeamGroupFilters{
        allTeamGroupFilters{
            edges {
                node {
                    ...teamGroupFilterFragment
                }
            }

        }
    }
    ${ MTeam.groupFilterfragment }`;


export const teamQuery = gql`
query FilterTeamQuery($filters: String!, $size: Int, $thCursor: String) {
    filterTeam(first: $size, after: $thCursor, jsonFilter: $filters) {
        totalCount
        pageInfo {
            startCursor
            endCursor
        },
        edges {
            node {
              ...teamFragment
            }
        }
    }
} ${ MTeam.fragment }`;


export const createTeam = gql`
mutation CreateTeam($params: CreateTeamInput!) {
  createTeam(input: $params){
    team {
        ...teamFragment
        }
    }
}
${ MTeam.fragment }
`;


export const updateTeam = gql`
mutation updateTeam($params: UpdateTeamInput!) {
    updateTeam(input: $params){
      team {
        ...teamFragment
      }
    }
  }
  ${ MTeam.fragment }
  `;


export const singleTeamQuery = gql`
  query singleTeam($id: ID!) {
    team(id: $id) {
      ...teamFragment
    }
  }
  ${ MTeam.fragment }
  `;
