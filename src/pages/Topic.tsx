import { useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../features/topic/components/User.tsx";
import Logo from "../components/Logo";
import TopicContainer from "../features/topic/components/TopicContainer"

const Topic = () => {
	const { id } = useParams<{ id: string }>();

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
