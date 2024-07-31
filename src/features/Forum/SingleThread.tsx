// import { Topic } from "../../utils/sample-data";
import { TopicProps } from "../Topic/services/gettopic";
import TopicTag from "./TopicTag";
import React from "react";

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
			<div className="relative grid grid-cols-3 gap-1 border-b border-gray-200">
				<a href={`../topic/${topic.id}`} className="col-span-2 text-lg font-bold">
					{topic.title}
				</a>
				<TopicTag />
				<div />
				<div className="grid grid-cols-3 gap-1 p-4 text-center text-[12px] font-bold">
					<span>{topic.counter.replies}</span>
					<span>{topic.counter.likes}</span>
					<span>{formatDate(new Date(topic.activity))}</span>
				</div>
			</div>
		</div>
	);
};

export default SingleThread;
