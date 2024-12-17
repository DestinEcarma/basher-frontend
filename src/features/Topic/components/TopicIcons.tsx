import ReplyButton from "./ReplyButton";
import TopicButton from "./TopicButton";
import React, { useState, useEffect } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";

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
	const [likes, setLikes] = useState<number>(0);
	const [isLiked, setLikeStatus] = useState<boolean>(false);

	const [shares, setShares] = useState<number>(0);
	const [isShared, setSharedStatus] = useState<boolean>(false);

	const addLike = (): void => {
		if (!isLiked) {
			setLikes((prev) => prev + 1);
			setLikeStatus(true);
		} else {
			setLikes((prev) => prev - 1);
			setLikeStatus(false);
		}
	};

	const addChain = (): void => {
		if (!isShared) {
			setShares((prev) => prev + 1);
			setSharedStatus(true);
		}
	};

	useEffect(() => {
		setLikes(counter.likes ?? 0);
		setShares(counter.shares ?? 0);
	}, [counter]);

	return (
		<div className="flex select-none items-end justify-end gap-4 text-[#808080] hover:cursor-pointer">
			<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
			<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} status={isShared} />
			<ReplyButton onClick={openReply} />
		</div>
	);
};

export default TopicIcons;
