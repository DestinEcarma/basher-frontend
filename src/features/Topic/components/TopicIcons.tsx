import ReplyButton from "./ReplyButton";
import TopicButton from "./TopicButton";
import { Button } from "@components/button";
import React, { useState, useEffect } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaPen } from "react-icons/fa6";

interface TopicIconsProps {
	openCreateReply: React.MouseEventHandler;
	openEditTopic: React.MouseEventHandler;
	isOwner: boolean;
	counter: {
		likes: number;
		shares: number;
		views: number;
		replies: number;
	};
}

const TopicIcons: React.FC<TopicIconsProps> = ({ openCreateReply, openEditTopic, counter, isOwner }) => {
	const [likes, setLikes] = useState<number>(0);
	const [isLiked, setLikeStatus] = useState<boolean>(false);

	const [shares, setShares] = useState<number>(0);
	const [isShared, setSharedStatus] = useState<boolean>(false);

	const addLike = (): void => {
		// TODO: Add like mutation

		if (!isLiked) {
			setLikes((prev) => prev + 1);
			setLikeStatus(true);
		} else {
			setLikes((prev) => prev - 1);
			setLikeStatus(false);
		}
	};

	const addChain = (): void => {
		// TODO: Add share mutation

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
		<div className="flex select-none items-center justify-end gap-4 text-[#808080] hover:cursor-pointer">
			<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
			<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} status={isShared} />
			{isOwner && (
				<Button variant="ghost" onClick={openEditTopic} className="flex items-center gap-2 text-gray-500">
					<FaPen className="text-2xl" />
					Edit
				</Button>
			)}
			<ReplyButton onClick={openCreateReply} />
		</div>
	);
};

export default TopicIcons;
