// import React, { useState } from "react";
// import User from "./User";
// import Tags from "./Tags";
// import TopicContent from "./TopicContent";
// import TopicIcons from "./TopicIcons";
// import { Topic as TopicProps } from "../../../utils/sample-data";
// import ReplyInputContainer from "./ReplyInputContainer";
// interface TopicContainerProps {
// 	topic: TopicProps;
// }
// const TopicContainer: React.FC<TopicContainerProps> = ({ topic }) => {
// 	const tags: string[] = ["#hate", "#usc", "#godwin"];
// 	const [willReply, setWillReply] = useState(false);
// 	const openReply: React.MouseEventHandler = () => {
// 		setWillReply((prev) => !prev);
// 	};
// 	return (
// 		<div className="flex flex-col justify-center items-center mt-[2.813rem]">
// 			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
// 				<h1 className="font-bold text-2xl leading-none">{topic.title}</h1>
// 				<Tags tags={tags} />
// 				<User author={"0"} isOP={true} />
// 				<TopicContent content={topic.content} />
// 				<TopicIcons openReply={openReply} />
// 			</div>
// 			{willReply && <ReplyInputContainer User={<User author={"0"} isOP={true} />} openReply={openReply} />}
// 		</div>
// 	);
// };
// export default TopicContainer;
// api version
import { TopicProps } from "../services/gettopic";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";
import User from "./User";
import createPost from "@components/create-post";

interface TopicContainerProps {
	topic: TopicProps;
}

const TopicContainer: React.FC<TopicContainerProps> = ({ topic }) => {
	// const tags: string[] = ["#hate", "#usc", "#godwin"];
	// const [willReply, setWillReply] = useState(false);

	// const openReply: React.MouseEventHandler = () => {
	// 	setWillReply((prev) => !prev);
	// };

	const onClickCreateReply = () => {
		createPost.open({
			mode: "reply",
			postId: topic.id,
			replyUserIndex: 0,
			onSubmit: (content) => {
				console.log(content);
			},
		});
	};

	return (
		<div className="mt-[2.813rem] flex flex-col items-center justify-center">
			<div className="w-full rounded-md bg-white px-6 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl">
				<h1 className="text-2xl font-bold leading-none">{topic.title}</h1>
				<Tags tags={topic.tags} />
				<User index={0} />

				<TopicContent content={topic.content} />
				<TopicIcons openReply={onClickCreateReply} counter={topic.counter} />
			</div>
			{/* {willReply && <ReplyInputContainer User={<User index={0} />} openReply={onClickCreateReply} />} */}
		</div>
	);
};

export default TopicContainer;
