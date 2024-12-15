import { gql } from "@apollo/client";
import { Counter } from "@utils/defs";

export interface Topic {
	id: string;
	title: string;
	tags: string[];
	activity: string;
	counter: Counter;
}

export interface Tag {
	name: string;
}

export type ForumTopic = Omit<Topic, "counter"> & { counter: Omit<Counter, "views" | "shares"> };

export interface CreateTopicFields {
	title: string;
	tags: Tag[];
	content: string;
}

export const CREATE_TOPIC = gql`
	mutation CreateTopic($input: CreateTopicInput!) {
		topic {
			create(input: $input)
		}
	}
`;

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

export interface SearchTopicInput {
	query: string;
	tags: Tag[];
	offset: number;
}

export interface SearchTopicsQuery {
	topic: {
		search: ForumTopic[];
	};
}

export const SEARCH_TOPICS = gql`
	query SearchTopics($input: SearchTopicInput!) {
		topic {
			search(input: $input) {
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
