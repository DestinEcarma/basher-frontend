import { CREATE_REPLY, CreateReply, Topic, UPDATE_TOPIC, UpdateTopic } from "../utils/defs";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";
import User from "./User";
import { useMutation } from "@apollo/client";
import createPost from "@components/create-post";

interface TopicContainerProps extends Topic {}

const TopicContainer: React.FC<TopicContainerProps> = (topic) => {
	const [createTopic] = useMutation<CreateReply>(CREATE_REPLY);
	const [updateTopic] = useMutation<UpdateTopic>(UPDATE_TOPIC);

	const onClickCreateReply = () => {
		createPost.open({
			mode: "reply",
			postId: topic.id,
			replyUserIdentity: {
				identity: topic.userStatus.identity,
				isOwner: topic.userStatus.isOwner,
			},
			onSubmit: (content) => {
				createTopic({
					variables: {
						input: {
							content,
							topic: topic.id,
						},
					},
				});
			},
		});
	};

	const onClickEditTopic = () => {
		createPost.open({
			mode: "editTopic",
			topic,
			onSubmit: (content, title, tags) => {
				updateTopic({
					variables: {
						input: {
							id: topic.id,
							title,
							tags,
							content,
						},
					},
				});
			},
		});
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full rounded-md bg-white px-6 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl">
				<h1 className="text-2xl font-bold leading-none">{topic.title}</h1>
				<Tags tags={topic.tags} />
				<User identity={topic.userStatus.identity} isOwner={topic.userStatus.isOwner} />
				<TopicContent content={topic.content} />
				<TopicIcons openCreateReply={onClickCreateReply} openEditTopic={onClickEditTopic} {...topic} />
			</div>
		</div>
	);
};

export default TopicContainer;
