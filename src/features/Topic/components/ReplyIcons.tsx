import React, { useState } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import TopicButton from "./TopicButton";
import ReplyButton from "./ReplyButton";
import DropDownButton from "./DropDownButton";

interface ReplyIconsProps {
	openReply: React.MouseEventHandler;
}

const ReplyIcons: React.FC<ReplyIconsProps> = ({ openReply }) => {
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

	return (
		<div className="flex w-full justify-between items-end">
			<div>
				<DropDownButton Icon={FaChevronDown} onClick={addComment} count={comments} />
			</div>
			<div className="flex gap-4 text-[#808080] items-center select-none hover:cursor-pointer">
				<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
				<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} />
				<ReplyButton onClick={openReply} />
			</div>
		</div>
	);
};

export default ReplyIcons;
