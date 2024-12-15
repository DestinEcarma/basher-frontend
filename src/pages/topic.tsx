import ReplyContainer from "../features/Topic/components/ReplyContainer";
import TopicContainer from "../features/Topic/components/TopicContainer";
import { useQuery } from "@apollo/client";
import { Reply, Topic } from "@features/Topic/utils/defs";
import { useEvent } from "@features/Topic/utils/event";
import { GET_TOPIC, GET_REPLIES } from "@graphql/queries";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopicPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [topic, setTopic] = useState<Topic | null>(null);
	const [replies, setReplies] = useState<Reply[] | null>(null);
	const [offset] = useState<number>(0);
	const navigate = useNavigate();

	const topicResponse = useQuery(GET_TOPIC, {
		variables: {
			id,
		},
	});

	const event = useEvent();

	const useScrollToHash = () => {
		const { hash } = useLocation();

		useEffect(() => {
			if (hash) {
				const element = document.getElementById(hash.substring(1));
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}
		}, [hash]);
	};

	const repliesResponse = useQuery(GET_REPLIES, {
		variables: {
			input: {
				id,
				offset,
			},
		},
	});

	const defaultTopic: Topic = {
		id: "",
		title: "",
		tags: [""],
		counter: {
			likes: 0,
			shares: 0,
			views: 0,
			replies: 0,
		},
		content: "",
		activity: "",
	};

	useEffect(() => {
		const handleCreateReply = (reply: Reply) => {
			if (reply.parent) {
				setReplies((prevReplies) => {
					return (
						prevReplies?.map((prevReply) => {
							if (prevReply.id === reply.parent.id) {
								return {
									...prevReply,
									counter: {
										...prevReply.counter,
										replies: prevReply.counter.replies + 1,
									},
								};
							}

							return prevReply;
						}) ?? []
					);
				});
			}

			setReplies((prevReplies) => {
				return prevReplies ? [...prevReplies, reply] : [reply];
			});
		};

		event.on("createReply", handleCreateReply);

		return () => {
			event.off("createReply", handleCreateReply);
		};
	});

	useEffect(() => {
		if (!topicResponse || !topicResponse.data) return;

		if (!topicResponse.data.topic.getById) {
			navigate("/");
		}

		setTopic(topicResponse.data.topic.getById);
	}, [topicResponse, navigate]);

	useEffect(() => {
		if (!repliesResponse || !repliesResponse.data) return;

		setReplies(repliesResponse.data.reply.getFromTopic);
	}, [repliesResponse]);

	useScrollToHash();

	return (
		<div className="mt-4 w-full pb-11">
			{topic && <TopicContainer topic={topic || defaultTopic} />}
			{topic &&
				replies &&
				replies.map((reply, i) => {
					return <ReplyContainer key={i} topicId={topic.id} reply={reply} />;
				})}
		</div>
	);
};

export default TopicPage;
