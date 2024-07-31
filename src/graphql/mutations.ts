import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		user {
			login(input: $input)
		}
	}
`;

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		user {
			signUp(input: $input)
		}
	}
`;

export const CREATE_TOPIC = gql`
	mutation CreateTopic($input: CreateTopicInput!) {
		topic {
			create(input: $input)
		}
	}
`;

export const CREATE_REPLY = gql`
	mutation CreateReply($input: CreateReplyInput!) {
		reply {
			create(input: $input)
		}
	}
`;
