import React from "react";
import User from "./User";

interface PostProps {
	id: number;
}

const Post: React.FC<PostProps> = ({ id }) => {
	return (
		<div className="bg-white rounded-lg mt-8 p-5">
			<h1>Topic # {id}</h1>
			<h1 className="font-bold text-2xl">I got molested by sir godwin...</h1>
			<User id={0} />
		</div>
	);
};

export default Post;
