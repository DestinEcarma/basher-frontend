import React from "react";
import { Topic } from "../../utils/sample-data";
import SingleThread from "./SingleThread";

interface TopicProps {
	topics: Topic[];
}

const ForumContainer: React.FC<TopicProps> = ({ topics }) => {
	return (
		<div className="w-[600px] h-[500px] bg-white shadow-xl p-[10px] rounded-lg">
			<div className="grid grid-cols-3 gap-1 p-4">
				<h3 className="font-black col-span-2">Topics</h3>
				<div className="grid grid-cols-3 gap-1 text-center">
					<span>Replies</span>
					<span>Likes</span>
					<span>Activity</span>
				</div>
			</div>
			{topics.map((topic) => (
				<SingleThread key={topic.id} topic={topic} />
			))}
		</div>
	);
};

export default ForumContainer;
