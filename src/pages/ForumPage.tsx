import React, { useState, useEffect } from "react";
import SearchBarContainer from "../features/Forum/SearchBarContainer";
import ForumContainer from "../features/Forum/ForumContainer";
// import { Tables, Topic } from "../utils/sample-data";
import { getForumTopics } from "../features/Forum/services/gettopics";
import { TopicProps } from "../features/Topic/services/gettopic";

const ForumPage: React.FC = () => {
	const [topics, setTopics] = useState<TopicProps[] | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortType, setSortType] = useState<"new" | "top" | null>(null);
	const [offSet] = useState<number>(0);

	useEffect(() => {
		let filteredTopics = null; //just so i can use haha

		if (topics !== null) {
			filteredTopics = topics.filter((topic) => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

			if (sortType === "new") {
				filteredTopics = filteredTopics.sort(
					(a, b) => new Date(b.activity).getTime() - new Date(a.activity).getTime(),
				);
			} else if (sortType === "top") {
				filteredTopics = filteredTopics.sort(
					(a, b) => b.counter.replies + b.counter.likes - (a.counter.replies + a.counter.likes),
				);
			}
		}

		setTopics(filteredTopics);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, sortType]);

	useEffect(() => {
		async function receiveForumTopics() {
			if (offSet != null) {
				try {
					const topicsResult: TopicProps[] | null = await getForumTopics(offSet);
					if (topicsResult) {
						setTopics(topicsResult);
					}
				} catch (e) {
					console.error(e);
				}
			}
		}

		receiveForumTopics();
	}, [offSet]);

	return (
		<div className="bg-gray-100 flex flex-col items-center">
			<div>
				<SearchBarContainer onSearch={setSearchTerm} onSort={setSortType} />
			</div>
			<div>
				<ForumContainer topics={topics} />
			</div>
		</div>
	);
};

export default ForumPage;
