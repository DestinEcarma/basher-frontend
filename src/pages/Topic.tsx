import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import TopicContainer from "../features/topic/components/TopicContainer";
// import Post from "../features/Post";

const Topic = () => {
	const { id } = useParams<{id: string}>();
	useEffect(() => {}, []);

	return (
		<div className="bg-[#F6F6F9] w-full min-h-screen">
			<Logo />
			<TopicContainer />
			<h1>Topic # {id}</h1>
		</div>
	);
};

export default Topic;
