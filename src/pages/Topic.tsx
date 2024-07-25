import { useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../features/User.tsx";
import Logo from "../components/Logo";

const Topic = () => {
	const { id } = useParams<{ id: string }>();

	useEffect(() => {}, []);

	return (
		<div className="bg-[#F6F6F9] w-full min-h-screen">
			<Logo />
			<h1>Task # {id}</h1>
			<User id={0} />
		</div>
	);
};

export default Topic;
