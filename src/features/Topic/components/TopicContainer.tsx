import { CREATE_REPLY, CreateReply, Topic } from "../utils/defs";
import { eventCreateReply } from "../utils/event";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";
import User from "./User";
import { useMutation } from "@apollo/client";
import createPost from "@components/create-post";
import { useEffect } from "react";

interface TopicContainerProps {
	topic: Topic;
}

const TopicContainer: React.FC<TopicContainerProps> = ({ topic }) => {
	const [createTopic, { data }] = useMutation<CreateReply>(CREATE_REPLY);

	useEffect(() => {
		if (data) {
			eventCreateReply(data.reply.create);
		}
	}, [data]);

	const onClickCreateReply = () => {
		createPost.open({
			mode: "reply",
			postId: topic.id,
			replyUserIndex: 0,
			onSubmit: (content) => {
				createTopic({
					variables: {
						input: {
							content,
							topic: topic.id,
						},
					},
				});

				createPost.close();
			},
		});
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full rounded-md bg-white px-6 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl">
				<h1 className="text-2xl font-bold leading-none">{topic.title}</h1>
				<Tags tags={topic.tags} />
				<User index={0} />
				<TopicContent content={topic.content} />
				<TopicIcons openReply={onClickCreateReply} counter={topic.counter} />
			</div>
		</div>
	);
};

export default TopicContainer;
