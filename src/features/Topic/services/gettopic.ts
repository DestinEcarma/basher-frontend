import { GRAPHQL_PATH, API } from "../../../services/api";
import { Topic } from "@utils/sample-data";

export interface TopicProps {
	id: string;
	// author: string;
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

export async function getTopic(id: string): Promise<Topic | null> {
	const TOPIC_QUERY = `
			query GetTopic($id: String!) {
				topic {
					getById(id: $id) {
						id
						title
						tags
						counter {
							likes
							shares
							views
							replies
						}
						content
						activity
					}
				}
			}
		`;

	const response = await API.post(GRAPHQL_PATH, {
		query: TOPIC_QUERY,
		variables: {
			id,
		},
	});

	return response.data.data.topic.getById;
}
