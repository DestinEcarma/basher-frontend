// import React, { useState } from "react";
// import { BiLike, BiComment, BiLinkAlt } from "react-icons/bi";
// import TopicButton from "./TopicButton";
// import ReplyButton from "./ReplyButton";
// interface TopicIconsProps {
// 	openReply: React.MouseEventHandler;
// }
// const TopicIcons: React.FC<TopicIconsProps> = ({ openReply }) => {
// 	const [likes, setLikes] = useState<number>(0);
// 	const [isLiked, setLikeStatus] = useState<boolean>(false);
// 	const [comments, setComments] = useState<number>(0);
// 	const [shares, setShares] = useState<number>(0);
// 	const addLike = (): void => {
// 		if (!isLiked) {
// 			setLikes((prev) => prev + 1);
// 			setLikeStatus(true);
// 		} else {
// 			setLikes((prev) => prev - 1);
// 			setLikeStatus(false);
// 		}
// 	};
// 	const addComment = (): void => {
// 		setComments((prev) => prev + 1);
// 	};
// 	const addChain = (): void => {
// 		setShares((prev) => prev + 1);
// 	};
// 	return (
// 		<div className="flex w-full justify-between items-end">
// 			<div className="flex gap-4">
// 				<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
// 				<TopicButton Icon={BiComment} onClick={addComment} count={comments} />
// 				<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} />
// 			</div>
// 			<ReplyButton onClick={openReply} />
// 		</div>
// 	);
// };
// export default TopicIcons;
//api version
import ReplyButton from "./ReplyButton";
import TopicButton from "./TopicButton";
import React, { useState, useEffect } from "react";
import { BiLike, BiComment, BiLinkAlt } from "react-icons/bi";

interface TopicIconsProps {
	openReply: React.MouseEventHandler;
	counter: {
		likes: number;
		shares: number;
		views: number;
		replies: number;
	};
}

const TopicIcons: React.FC<TopicIconsProps> = ({ openReply, counter }) => {
	console.log(counter);
	const [likes, setLikes] = useState<number>(0);
	const [isLiked, setLikeStatus] = useState<boolean>(false);

	const [comments, setComments] = useState<number>(0);

	const [shares, setShares] = useState<number>(0);

	const addLike = (): void => {
		if (!isLiked) {
			setLikes((prev) => prev + 1);
			setLikeStatus(true);
		} else {
			setLikes((prev) => prev - 1);
			setLikeStatus(false);
		}
	};

	const addComment = (): void => {
		setComments((prev) => prev + 1);
	};

	const addChain = (): void => {
		setShares((prev) => prev + 1);
	};

	useEffect(() => {
		setLikes(counter.likes ?? 0);
		setComments(counter.replies ?? 0);
		setShares(counter.shares ?? 0);
	}, [counter]);

	return (
		<div className="flex w-full items-end justify-between">
			<div className="flex gap-4">
				<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
				<TopicButton Icon={BiComment} onClick={addComment} count={comments} />
				<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} />
			</div>
			<ReplyButton onClick={openReply} />
		</div>
	);
};

export default TopicIcons;
