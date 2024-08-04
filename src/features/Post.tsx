import User from "./Topic/components/User";
import React from "react";

interface PostProps {
	id: number;
}

const Post: React.FC<PostProps> = ({ id }) => {
	return (
		<div className="mt-8 rounded-lg bg-white p-5">
			<h1>Topic # {id}</h1>
			<h1 className="text-2xl font-bold">I got molested by sir godwin...</h1>
			<User index={0} />
		</div>
	);
};

export default Post;
