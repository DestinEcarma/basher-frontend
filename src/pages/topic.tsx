import ReplyContainer from "../features/Topic/components/ReplyContainer";
import TopicContainer from "../features/Topic/components/TopicContainer";
import { ReplyProps } from "../features/Topic/services/getreplies";
import { TopicProps } from "../features/Topic/services/gettopic";
import { GraphqlError, GraphqlErrorType } from "@services/graphql";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TOPIC, GET_REPLIES } from "@graphql/queries";
import { useNavigate } from "react-router-dom";

const TopicPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [topic, setTopic] = useState<TopicProps | null>(null);
	const [replies, setReplies] = useState<ReplyProps[] | null>(null);
	const [offset] = useState<number>(0);
	const navigate = useNavigate();
	const topicResponse = useQuery(GET_TOPIC, {
		variables: {
			id
		}
	});

	const repliesResponse = useQuery(GET_REPLIES, {
		variables: {
			input: {
				id,
				offset
			}
		}
	});

	const defaultTopic: TopicProps = {
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
		if(!topicResponse || !topicResponse.error) return;

		topicResponse.error.graphQLErrors.forEach((err: GraphqlError) => {
			switch(err.message) {
				case GraphqlErrorType.BAD_REQUEST:
					alert("Bad request");
					return;
				case GraphqlErrorType.INTERNAL_SERVER_ERROR:
					alert("Internal Server Error");
					return;
				default:
					alert("Unknown Error");
					return;
			}
		})
	}, [topicResponse]);

	useEffect(() => {
		console.log(topicResponse);
		if(!topicResponse || !topicResponse.data) return;

		if(!topicResponse.data.topic.getById) {
			navigate("/");
		}

		setTopic(topicResponse.data.topic.getById);
	}, [topicResponse, navigate]);

	useEffect(() => {
		if(!repliesResponse || !repliesResponse.error) return;

		repliesResponse.error.graphQLErrors.forEach((err: GraphqlError) => {
			switch(err.message) {
				case GraphqlErrorType.BAD_REQUEST:
					alert("Bad request");
					return;
				case GraphqlErrorType.INTERNAL_SERVER_ERROR:
					alert("Internal Server Error");
					return;
				default:
					alert("Unknown Error");
					return;
			}
		})
	}, [repliesResponse]);

	useEffect(() => {
		if(!repliesResponse || !repliesResponse.data) return;

		setReplies(repliesResponse.data.reply.getFromTopic);
	}, [repliesResponse]);

	return (
		<div className="w-full bg-[#F6F6F9] pb-11">
			{topic && <TopicContainer topic={topic || defaultTopic} />}
			{topic &&
				replies &&
				replies.map((reply, i) => {
					return <ReplyContainer key={i} reply={reply} />;
				})}
		</div>
	);
};

export default TopicPage;
