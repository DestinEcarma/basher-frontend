import ReplyContainer from "../features/Topic/components/ReplyContainer";
import TopicContainer from "../features/Topic/components/TopicContainer";
import { useQuery } from "@apollo/client";
import { GET_TOPIC, GET_REPLIES, GetReplies, GetTopic, Reply, Topic } from "@features/Topic/utils/defs";
import { useEvent } from "@features/Topic/utils/event";
import { INTERSECTION_OPTIONS } from "@utils/defs";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopicPage: React.FC = () => {
	const event = useEvent();

	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	const lastReplyRef = React.useRef<HTMLDivElement>(null);

	const [offset, setOffset] = useState<number>(0);
	const [topic, setTopic] = useState<Topic>();
	const [replies, setReplies] = useState<Reply[]>([]);

	const { data: topicData } = useQuery<GetTopic>(GET_TOPIC, {
		variables: {
			id,
		},
	});

	const { data: repliesData, fetchMore: repliesFetchMore } = useQuery<GetReplies>(GET_REPLIES, {
		variables: {
			input: {
				id,
				offset,
			},
		},
	});

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			console.log(entries);
			if (entries[0].isIntersecting) {
				setOffset(replies.length);
				repliesFetchMore({
					variables: {
						id,
						offset: replies.length,
					},
				});
			}
		}, INTERSECTION_OPTIONS);

		if (lastReplyRef.current) {
			observer.observe(lastReplyRef.current);
		}

		return () => observer.disconnect();
	}, [id, lastReplyRef, replies.length, repliesFetchMore]);

	useEffect(() => {
		const handleCreateReply = (reply: Reply) => {
			if (reply.parent) {
				setReplies((prevReplies) => {
					return (
						prevReplies?.map((prevReply) => {
							if (prevReply.id === reply.parent.id) {
								return {
									...prevReply,
									counter: { ...prevReply.counter, replies: prevReply.counter.replies + 1 },
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
		if (!topicData) return;

		if (!topicData.topic.getById) {
			navigate("/");
		}

		setTopic(topicData.topic.getById);
	}, [topicData, navigate]);

	useEffect(() => {
		if (!repliesData) return;

		setReplies((prev) => {
			const existingIds = new Set(prev.map((reply) => reply.id));
			const newTopics = repliesData.reply.getFromTopic.filter((topic) => !existingIds.has(topic.id));
			return [...prev, ...newTopics].sort(
				(a, b) => new Date(a.activity).getTime() - new Date(b.activity).getTime(),
			);
		});
	}, [repliesData]);

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

	useScrollToHash();

	return (
		<div className="mt-4 w-full pb-11">
			{topic && <TopicContainer topic={topic} />}
			{topic &&
				replies &&
				replies.map((reply, index) => {
					return <ReplyContainer
						ref={index === replies.length - 1 ? lastReplyRef : null}
						key={index}
						reply={reply}
						topicId={topic.id}
					/>;
				})}
		</div>
	);
};

export default TopicPage;
