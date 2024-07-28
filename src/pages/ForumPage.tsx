import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import SearchBarContainer from "../features/Forum/SearchBarContainer";
import ForumContainer from "../features/Forum/ForumContainer";
import { Tables, Topic } from "../utils/sample-data";

const ForumPage: React.FC = () => {
	const [topics, setTopics] = useState<Topic[]>(Tables.Topics);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortType, setSortType] = useState<"new" | "top" | null>(null);

	useEffect(() => {
		let filteredTopics = Tables.Topics.filter((topic) =>
			topic.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		if (sortType === "new") {
			filteredTopics = filteredTopics.sort(
				(a, b) => new Date(b.time.createdAt).getTime() - new Date(a.time.createdAt).getTime(),
			);
		} else if (sortType === "top") {
			filteredTopics = filteredTopics.sort(
				(a, b) => b.counter.replies + b.counter.likes - (a.counter.replies + a.counter.likes),
			);
		}

		setTopics(filteredTopics);
	}, [searchTerm, sortType]);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center">
			<div className="top-10">
				<Logo />
			</div>
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
