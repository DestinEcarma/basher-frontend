import { gql } from "@apollo/client";
import { Counter } from "@utils/defs";

export interface Topic {
	id: string;
	title: string;
	tags: string[];
	activity: string;
	counter: Counter;
}

export type ForumTopic = Omit<Topic, "counter"> & { counter: Omit<Counter, "views" | "shares"> };

export interface GetTopicsQuery {
	topic: {
		get: ForumTopic[];
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
