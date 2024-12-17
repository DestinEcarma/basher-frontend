import { gql } from "@apollo/client";
import { Counter } from "@utils/defs";

interface Parent {
	id: string;
	userIndex: number;
}

export interface Topic {
	id: string;
	title: string;
	tags: string[];
	counter: {
		likes: number;
		shares: number;
		views: number;
		replies: number;
	};
	content: string;
	activity: string;
}

export interface Reply {
	id: string;
	userIndex: number;
	content: string;
	counter: Omit<Counter, "views">;
	parent: Parent;
	activity: string;
}

export interface GetTopic {
	topic: {
		getById: Topic;
	};
}

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

export interface GetReplies {
	reply: {
		getFromTopic: Reply[];
	};
}

export const GET_REPLIES = gql`
	query GetReply($input: IdOffsetInput!) {
		reply {
			getFromTopic(input: $input) {
				id
				userIndex
				content
				counter {
					likes
					shares
					replies
				}
				parent {
					id
					userIndex
				}
				activity
			}
		}
	}
`;

export interface CreateReply {
	reply: {
		create: Reply;
	};
}

export const CREATE_REPLY = gql`
	mutation CreateReply($input: CreateReplyInput!) {
		reply {
			create(input: $input)
		}
	}
`;

export interface GetReply {
	reply: {
		getReply: Reply;
	};
}

export const GET_REPLY = gql`
	query GetReply($input: GetReplyInput!) {
		reply {
			getReply(input: $input) {
				id
				userIndex
				content
				counter {
					likes
					shares
					replies
				}
				parent {
					id
					userIndex
				}
				activity
			}
		}
	}
`;

export interface SubreplyProps {
	id: string;
	userIndex: number;
	content: string;
	activity: string;
}

export const GET_SUB_REPLIES = gql`
	query GetSubReplies($input: IdOffsetInput!) {
		reply {
			getFromReply(input: $input) {
				id
				userIndex
				content
			}
		}
	}
`;

export function incrementCounterReplies<T extends Topic | Reply>(post: T) {
	return {
		...post,
		counter: {
			...post.counter,
			replies: post.counter.replies + 1,
		},
	};
}
