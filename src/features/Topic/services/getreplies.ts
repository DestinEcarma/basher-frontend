import { GRAPHQL_PATH, API } from "../../../services/api";

export interface ReplyProps {
	id: string;
	userIndex: number;
	counter: {
		likes: number;
		shares: number;
		replies: number;
	};
	content: string;
	activity: string;
	parent?: {
		id: number;
		userIndex: number;
	};
}

export async function getReplies(topic_id: string, offset: number): Promise<ReplyProps[] | null> {
	const REPLY_QUERY = `
		query GetReply($input: IdOffsetInput!) {
			reply {
				getFromTopic(input: $input) {
					id
					userIndex
					counter {
						likes
						shares
						views
						replies
					}
					content
					activity
					parent
				}
			}
		}
	`;

	const response = await API.post(GRAPHQL_PATH, {
		query: REPLY_QUERY,
		variables: {
			input: {
				id: topic_id,
				offset,
			},
		},
	});

	const result = response.data.data.reply.getFromTopic;

	return result;
}
