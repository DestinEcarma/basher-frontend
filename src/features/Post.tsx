import React from "react";
import User from "./User";

interface PostProps {
	id: number;
}

const Post: React.FC<PostProps> = ({ id }) => {
	return (
		<div className="mt-8 rounded-lg bg-white p-5">
			<h1>Topic # {id}</h1>
			<h1 className="text-2xl font-bold">I got molested by sir godwin...</h1>
			<User id={0} />
		</div>
	);
};

export default Post;
