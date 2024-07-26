import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import TopicContainer from "../features/topic/components/TopicContainer";

const Topic = () => {
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		console.log(id);
	}, [id]);

	return (
		<div className="bg-[#F6F6F9] w-full min-h-screen pt-11">
			<Logo />
			<TopicContainer />
		</div>
	);
};

export default Topic;
