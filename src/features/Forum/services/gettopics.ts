import { GRAPHQL_PATH, API } from "../../../services/api";
import { TopicProps } from "../../Topic/services/gettopic";

export async function getForumTopics(offset: number): Promise<TopicProps[] | null> {
	const TOPICS_QUERY = `
		query ($offset: Int!) {
			topic {
				get(offset: $offset) {
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
		query: TOPICS_QUERY,
		variables: {
			offset,
		},
	});

	if (response.data.data === null && typeof response.data.data.errors === "object") {
		return null;
	} else {
		return response.data.data.topic.get;
	}
}
