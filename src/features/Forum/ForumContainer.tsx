import React from "react";
// import { Topic } from "../../utils/sample-data";
import SingleThread from "./SingleThread";
import { TopicProps } from "../Topic/services/gettopic";

interface ForumProps {
	topics: TopicProps[] | null;
}

const ForumContainer: React.FC<ForumProps> = ({ topics }) => {
	return (
		<div className="w-[600px] h-[500px] bg-white shadow-xl p-[10px] rounded-lg">
			<div className="grid grid-cols-3 gap-1">
			<h3 className="font-black col-span-2 p-4">Topics</h3>
				<div className="grid grid-cols-3 gap-1 text-center text-[12px] text-gray-500 p-4">
					<span>Replies</span>
					<span>Likes</span>
					<span>Activity</span>
				</div>
			</div>
			{topics != null && topics.map((topic) => <SingleThread key={topic.id} topic={topic} />)}
		</div>
	);
};

export default ForumContainer;