import { GRAPHQL_PATH, API } from "../../../services/api";

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

export async function getreplies(topic_id: string): Promise<SubreplyProps[] | null> {
	const SUBREPLY_QUERY = `
		temp
	`;

	const response = await API.post(GRAPHQL_PATH, {
		query: SUBREPLY_QUERY,
		variables: {
			id: topic_id,
		},
	});

	const result = response.data;

	if (result.data === null) {
		return null;
	} else {
		return result.data;
	}
}
