import { useEffect } from "react";
import Logo from "../components/Logo";
import Post from "../features/Post";

const Topic = () => {
	useEffect(() => {}, []);

	return (
		<div className="flex justify-center bg-[#F6F6F9] w-full min-h-screen">
			<div className="flex flex-col lg:max-w-7xl max-w-3xl w-full">
				<Logo />
				<Post id={0} />
			</div>
		</div>
	);
};

export default Topic;
