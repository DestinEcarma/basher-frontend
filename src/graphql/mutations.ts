import { gql } from "@apollo/client";

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
