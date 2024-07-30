// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import Logo from "../components/Logo";
// import TopicContainer from "../features/Topic/components/TopicContainer";
// import ReplyContainer from "../features/Topic/components/ReplyContainer";
// import { Topic as TopicProps, Reply as ReplyProps } from "../utils/sample-data";
// import { getTopic, getReplies } from "../services/api";

// const Topic = () => {
// 	const { id } = useParams<{ id: string }>();
// 	const [topic, setTopic] = useState<TopicProps | undefined>(undefined);
// 	const [replies, setReplies] = useState<ReplyProps[] | undefined>(undefined);

// 	const hasLoaded = useRef<boolean>(false);

// 	const defaultTopic: TopicProps = {
// 		id: "-1",
// 		author: "-1",
// 		title: "",
// 		content: "",
// 		time: {
// 			createdAt: new Date(),
// 			updatedAt: new Date(),
// 		},
// 	};

// 	useEffect(() => {
// 		if (!hasLoaded.current) {
// 			if (id) {
// 				try {
// 					const topicResult: TopicProps | undefined = getTopic(id);
// 					const repliesResult: ReplyProps[] | undefined = getReplies(id);
// 					if (topicResult) {
// 						setTopic(topicResult);
// 						setReplies(repliesResult);
// 					} else {
// 						window.location.href = "/";
// 					}
// 				} catch (e) {
// 					console.error(e);
// 				}
// 			} else {
// 				alert("No ID");
// 			}
// 		}

// 		hasLoaded.current = true;
// 	}, [id]);

// 	return (
// 		<div className="bg-[#F6F6F9] w-full min-h-screen py-11">
// 			<Logo />
// 			<TopicContainer topic={topic || defaultTopic} />
// 			{replies &&
// 				replies.map((reply, i) => {
// 					return <ReplyContainer key={i} reply={reply} />;
// 				})}
// 		</div>
// 	);
// };

// export default Topic;

// api version
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TopicContainer from "../features/Topic/components/TopicContainer";
import ReplyContainer from "../features/Topic/components/ReplyContainer";
import { getTopic, TopicProps } from "../features/Topic/services/gettopic";
import { getReplies, ReplyProps } from "../features/Topic/services/getreplies";

const TopicPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [topic, setTopic] = useState<TopicProps | null>(null);
	const [replies, setReplies] = useState<ReplyProps[] | null>(null);
	const [offSet] = useState<number>(0);

	const hasLoaded = useRef<boolean>(false);

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
		async function receiveTopic(): Promise<void> {
			if (id) {
				try {
					const topicResult: TopicProps | null = await getTopic(id);
					const repliesResult: ReplyProps[] | null = await getReplies(id, offSet);
					if (topicResult) {
						setTopic(topicResult);
						setReplies(repliesResult);
						console.log(topicResult);
					} else {
						window.location.href = "/";
					}
				} catch (e) {
					console.error(e);
					// window.location.href = "/";
				}
			} else {
				alert("No ID");
			}
		}

		if (!hasLoaded.current) {
			receiveTopic();
		}

		hasLoaded.current = true;
	}, [id, offSet]);

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
