import { gql } from "@apollo/client";

export interface LoginFields {
	email: string;
	password: string;
	rememberMe: boolean;
}

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		user {
			login(input: $input)
		}
	}
`;
