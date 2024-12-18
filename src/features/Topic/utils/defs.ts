import { gql } from "@apollo/client";
import { Counter, UserStatus } from "@utils/defs";

interface Parent {
	id: string;
	userIdentity: number;
}

export interface Topic {
	id: string;
	title: string;
	tags: string[];
	content: string;
	activity: string;
	counter: {
		likes: number;
		shares: number;
		views: number;
		replies: number;
	};
	userStatus: UserStatus;
}

export interface Reply {
	id: string;
	content: string;
	counter: Omit<Counter, "views">;
	parent: Parent;
	activity: string;
	userStatus: UserStatus;
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
				userStatus {
					identity
					isOwner
					isLiked
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
	query GetReply($input: GetRepliesInput!) {
		reply {
			getFromTopic(input: $input) {
				id
				content
				activity
				counter {
					likes
					shares
					replies
				}
				parent {
					id
					userIdentity
				}
				userStatus {
					isOwner
					isLiked
					identity
				}
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
				content
				activity
				counter {
					likes
					shares
					replies
				}
				parent {
					id
					userIdentity
				}
				userStatus {
					isOwner
					isLiked
					identity
				}
			}
		}
	}
`;

export interface SubreplyProps {
	id: string;
	content: string;
	activity: string;
	userStatus: UserStatus;
}

export const GET_SUB_REPLIES = gql`
	query GetSubReplies($input: GetRepliesFromReplyInput!) {
		reply {
			getFromReply(input: $input) {
				id
				content
				userStatus {
					identity
					isOwner
				}
			}
		}
	}
`;

export interface UpdateTopic {
	topic: {
		update: string;
	};
}

export const UPDATE_TOPIC = gql`
	mutation UpdateTopic($input: UpdateTopicInput!) {
		topic {
			update(input: $input)
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
