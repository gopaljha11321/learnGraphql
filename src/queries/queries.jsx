import { gql } from "@apollo/client";

export const GetAllQuotes = gql`
  query ($user: UserCheck) {
    validate(user: $user) {
      firstName
      lastName
    }
  }
`;
