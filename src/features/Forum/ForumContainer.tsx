import React from "react";
// import { Topic } from "../../utils/sample-data";
import SingleThread from "./SingleThread";
import { TopicProps } from "../Topic/services/gettopic";

interface ForumProps {
	topics: TopicProps[] | null;
}

const ForumContainer: React.FC<ForumProps> = ({ topics }) => {
	return (
		<div className="h-[500px] w-[600px] rounded-lg bg-white p-[10px] shadow-xl">
			<div className="grid grid-cols-3 gap-1 p-4">
				<h3 className="col-span-2 font-black">Topics</h3>
				<div className="grid grid-cols-3 gap-1 text-center">
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
