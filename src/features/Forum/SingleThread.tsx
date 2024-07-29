import React from "react";
// import { Topic } from "../../utils/sample-data";
import { TopicProps } from "../Topic/services/gettopic";

interface SingleThreadProps {
	topic: TopicProps;
}

const SingleThread: React.FC<SingleThreadProps> = ({ topic }) => {
	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};
	return (
		<div className="">
			<div className="border-b border-gray-200 p-4 grid grid-cols-3 gap-1">
				<a href={`../topic/${topic.id}`} className="text-lg font-bold col-span-2">
					{topic.title}
				</a>
				<div className="grid grid-cols-3 gap-1 text-center">
					<span>{topic.counter.replies}</span>
					<span>{topic.counter.likes}</span>
					<span>{formatDate(new Date(topic.activity))}</span>
				</div>
			</div>
		</div>
	);
};

export default SingleThread;
