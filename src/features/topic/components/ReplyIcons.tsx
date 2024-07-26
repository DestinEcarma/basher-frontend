import React, { useState } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { LuReply } from "react-icons/lu";
import TopicButton from "./TopicButton";
import ReplyButton from "./ReplyButton";

const ReplyIcons: React.FC = () => {
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
				<ReplyButton Icon={FaChevronDown} onClick={addComment} count={comments} />
			</div>
			<div className="flex gap-1 text-[#808080] items-center select-none hover:cursor-pointer">
				<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
				<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} />
				<div className="flex flex-row items-center px-2 py-1 rounded-lg hover:bg-gray-100 duration-200">
					<LuReply color="#808080" className="size-7" />
					<span>Reply</span>
				</div>
			</div>
		</div>
	);
};

export default ReplyIcons;
