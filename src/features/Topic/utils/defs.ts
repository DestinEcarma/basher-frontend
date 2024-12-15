import { Counter } from "@utils/defs";

interface Parent {
	id: number;
	userIndex: number;
}

export interface Reply {
	id: string;
	userIndex: number;
	content: string;
	counter: Omit<Counter, "views">;
	parent: Parent;
	activity: string;
}

export const GET_REPLIES = `
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
				parent
				activity
			}
		}
	}
`;
