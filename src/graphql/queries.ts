import { gql } from "@apollo/client";

export const GET_TOPIC = gql`
	query GetTopic($id: ID!) {
		topic {
			getById(id: $id) {
				id
				tags
				title
				content
				activity
				counter {
					likes
					views
					shares
					replies
				}
			}
		}
	}
`;

export const GET_REPLIES = gql`
	query GetReplies($input: IdOffsetInput!) {
		reply {
			getFromTopic(input: $input) {
				id
				userIndex
				content
				parent {
					id
					userIndex
				}
				activity
				counter {
					likes
					shares
					replies
				}
			}
		}
	}
`;

export const GET_SUB_REPLIES = gql`
	query GetSubReplies($input: IdOffsetInput!) {
		reply {
			getFromReply(input: $input) {
				id
				userIndex
				content
				activity
			}
		}
	}
`;
