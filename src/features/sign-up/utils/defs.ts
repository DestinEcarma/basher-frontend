import { gql } from "@apollo/client";

export interface SignUpFields {
	email: string;
	password: string;
	confirmPassword: string;
}

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		user {
			signUp(input: $input)
		}
	}
`;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
