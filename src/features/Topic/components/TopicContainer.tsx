import React, { useState } from "react";
import User from "./User";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";
import { Topic as TopicProps } from "../../../utils/sample-data";
import ReplyInputContainer from "./ReplyInputContainer";

interface TopicContainerProps {
	topic: TopicProps;
}

const TopicContainer: React.FC<TopicContainerProps> = ({ topic }) => {
	const tags: string[] = ["#hate", "#usc", "#godwin"];
	const [willReply, setWillReply] = useState(false);

	const openReply: React.MouseEventHandler = () => {
		setWillReply((prev) => !prev);
	};

	return (
		<div className="flex flex-col justify-center items-center mt-[2.813rem]">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<h1 className="font-bold text-2xl leading-none">{topic.title}</h1>
				<Tags tags={tags} />
				<User id={0} isOP={true} />

				<TopicContent content={topic.content} />
				<TopicIcons openReply={openReply} />
			</div>
			{willReply && <ReplyInputContainer User={<User id={0} isOP={true} />} openReply={openReply} />}
		</div>
	);
};

export default TopicContainer;
