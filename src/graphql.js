import gql from "graphql-tag";

export const TAIL_LIST = gql`
    query long_tails {
      long_tails {
        tail
        json_id
      }
    }
 `;

export const REMOVE_TAIL = gql`
    mutation ($json_id: Int!) {
      delete_long_tails_by_pk(json_id: $json_id) {
        json_id
      }
    }
 `;

export const UPDATE_TAIL = gql`
    mutation ($json_id: Int!, $tail: String!) {
      update_long_tails_by_pk(pk_columns: {json_id: $json_id}, _set: {tail: $tail}) {
        tail
        json_id
      }
    }
 `;

export const CREATE_TAIL = gql`
    mutation($tail: String!) {
      insert_long_tails_one(object: {tail: $tail}) {
        json_id
        tail
      }
    }
`;

export const TAIL_LIST_SUB = gql`
    subscription {
      long_tails {
        tail
        json_id
      }
    }
 `;