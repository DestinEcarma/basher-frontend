import React from "react";
// import { Topic } from "../../utils/sample-data";
import { TopicProps } from "../Topic/services/gettopic";
import TopicTag from "./TopicTag";

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
			<div className="border-b border-gray-200 grid grid-cols-3 gap-1 relative">
				<a href={`../topic/${topic.id}`} className="col-span-2 text-lg font-bold">
					{topic.title}
				</a>
				<TopicTag />
			<div/>
				<div className="grid grid-cols-3 gap-1 text-center font-bold text-[12px] p-4">
					<span>{topic.counter.replies}</span>
					<span>{topic.counter.likes}</span>
					<span>{formatDate(new Date(topic.activity))}</span>
				</div>
			</div>
		</div>
	);
};

export default SingleThread;
