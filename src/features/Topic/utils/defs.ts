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
			create(input: $input) {
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
	author: string;
	counter: {
		likes: number;
		shares: number;
		replies: number;
	};
	content: string;
	activity: string;
	parent: string;
}
