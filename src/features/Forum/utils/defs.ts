import { gql } from "@apollo/client";

export interface Topic {
	id: string;
	title: string;
	tags: string[];
	activity: string;
	counter: {
		likes: number;
		replies: number;
	};
}

export interface GetTopicsQuery {
	topic: {
		get: Topic[];
	};
}

export const GET_TOPICS = gql`
	query GetTopics($offset: Int!) {
		topic {
			get(offset: $offset) {
				id
				title
				tags
				activity
				counter {
					likes
					replies
				}
			}
		}
	}
`;
