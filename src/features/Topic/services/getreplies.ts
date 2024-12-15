import { GRAPHQL_PATH, API } from "../../../services/api";
import { Reply } from "../utils/defs";
import { GET_REPLIES } from "@graphql/queries";

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

export async function getReplies(topicId: string, offset: number): Promise<Reply[] | null> {
	const response = await API.post(GRAPHQL_PATH, {
		query: GET_REPLIES,
		variables: {
			input: {
				id: topicId,
				offset,
			},
		},
	});

	return response.data.data.reply.getFromTopic;
}
