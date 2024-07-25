import React from "react";
import { AiOutlineFire } from "react-icons/ai";

interface PostDetailProps {}

const PostDetail: React.FC<PostDetailProps> = () => {
	return (
		<div>
			<i>
				<AiOutlineFire />
			</i>
			<span></span>
		</div>
	);
};

export default PostDetail;
