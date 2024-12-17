import ReplyContainer from "../features/Topic/components/ReplyContainer";
import TopicContainer from "../features/Topic/components/TopicContainer";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
	GET_TOPIC,
	GET_REPLIES,
	GetReplies,
	GetTopic,
	Reply,
	Topic,
	GetReply,
	GET_REPLY,
	incrementCounterReplies,
} from "@features/Topic/utils/defs";
import { INTERSECTION_OPTIONS } from "@utils/defs";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopicPage: React.FC = () => {
	const navigate = useNavigate();

	const { hash } = useLocation();

	const { id } = useParams<{ id: string }>();

	const lastReplyRef = useRef<HTMLDivElement>(null);

	const [offset, setOffset] = useState<number>(0);
	const [topic, setTopic] = useState<Topic>();
	const [replies, setReplies] = useState<Reply[]>([]);

	const [getUpdateReply] = useLazyQuery<GetReply>(GET_REPLY);

	const { data: topicData } = useQuery<GetTopic>(GET_TOPIC, {
		variables: { id },
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
		if (!topic) return;

		const eventSource = new EventSource(`/sse/topic/${topic.id}`);

		eventSource.onmessage = async (event) => {
			const replyData = JSON.parse(event.data) as { id: string; kind: "Created" | "Updated" };

			const { data } = await getUpdateReply({
				variables: {
					input: {
						topic: topic.id,
						reply: replyData.id,
					},
				},
			});

			if (data?.reply.getReply) {
				setReplies((prevReplies) => {
					const index = prevReplies.findIndex((reply) => reply.id === replyData.id);

					if (index === -1 && replyData.kind === "Created") {
						if (prevReplies.length === topic.counter.replies) {
							setTopic((prevTopic) => {
								if (!prevTopic) return undefined;

								return incrementCounterReplies<Topic>(prevTopic);
							});

							return [
								...prevReplies.map((reply) => {
									if (reply.id === data.reply.getReply.parent.id) {
										return incrementCounterReplies<Reply>(reply);
									}

									return reply;
								}),
								data.reply.getReply,
							];
						}

						return prevReplies;
					} else {
						return prevReplies.map((reply) => {
							if (reply.id === replyData.id) {
								return data.reply.getReply;
							}

							return reply;
						});
					}
				});
			}
		};

		return () => eventSource.close();
	}, [topic, getUpdateReply, setTopic, setReplies]);

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

	useEffect(() => {
		if (!topic || !hash) return;

		(async () => {
			const replyId = hash.substring(1);

			const replyIndex = replies.findIndex((reply) => reply.id === replyId);

			if (replyIndex === -1) {
				console.log("fetching reply");

				const { data } = await getUpdateReply({
					variables: {
						input: {
							topic: topic.id,
							reply: replyId,
						},
					},
				});

				console.log(data);

				if (data?.reply.getReply) {
					setReplies((prevReplies) => [...prevReplies, data.reply.getReply]);
				}
			}

			const element = document.getElementById(replyId);

			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		})();
	}, [hash, replies, topic, getUpdateReply]);

	return (
		<div className="mt-4 w-full pb-11">
			{topic && <TopicContainer topic={topic} />}
			{topic &&
				replies &&
				replies.map((reply, index) => {
					return (
						<ReplyContainer
							ref={index === replies.length - 1 ? lastReplyRef : null}
							key={index}
							reply={reply}
							topicId={topic.id}
						/>
					);
				})}
		</div>
	);
};

export default TopicPage;
