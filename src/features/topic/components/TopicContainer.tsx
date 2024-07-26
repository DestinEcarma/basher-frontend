import React from "react";
import User from "./User";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";
import { Topic as TopicProps } from "../../../utils/sample-data";

interface TopicContainerProps {
	topic: TopicProps;
}

const TopicContainer: React.FC<TopicContainerProps> = ({ topic }) => {
	const tags: string[] = ["#hate", "#usc", "#godwin"];

	console.log(topic);

	return (
		<div className="flex justify-center mt-[2.813rem]">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<h1 className="font-bold text-2xl leading-none">{topic.title}</h1>
				<Tags tags={tags} />
				<User id={0} isOP={true} />

				<TopicContent title={topic.title}>
					<p>{topic.content}</p>
				</TopicContent>

				<TopicIcons />
			</div>
		</div>
	);
};

export default TopicContainer;
