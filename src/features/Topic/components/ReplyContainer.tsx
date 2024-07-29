import React, { useEffect, useState } from "react";
import User from "./User";
import ReplyContent from "./ReplyContent";
import ReplyInputContainer from "./ReplyInputContainer";
import DropDownButton from "./DropDownButton";
import TopicButton from "./TopicButton";
import ReplyButton from "./ReplyButton";
import ReplyDropdown from "./ReplyDropDown";
import { ReplyProps } from "../services/getreplies";
import { FaChevronDown } from "react-icons/fa";
import { BiLike, BiLinkAlt } from "react-icons/bi";

interface ReplyContainerProps {
	reply: ReplyProps;
}

function getCurrentTime() {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours}:${minutes}`;
}

const ReplyContainer: React.FC<ReplyContainerProps> = ({ reply }) => {
	const [willReply, setWillReply] = useState(false);
	const [showSubReplies, setShowSubReplies] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [subReplies, _setSubReplies] = useState<
		{
			userIndex: number;
			content: string;
			timestamp: Date;
		}[]
	>([]);

	useEffect(() => {
		// setSubReplies(() => {
		// 	if (showSubReplies) {
		// 		return Tables.SubReply.filter(({ id }) => id === reply.id).map(({ replies }) => replies)[0] ?? [];
		// 	} else {
		// 		return [];
		// 	}
		// });
	}, [showSubReplies, reply]);

	const openReply: React.MouseEventHandler = () => {
		setWillReply((prev) => !prev);
	};

	const handleDropdownClick: React.MouseEventHandler = () => {
		console.log("Dropdown clicked");
		setShowSubReplies((prev) => !prev);
	};

	const [likes, setLikes] = useState<number>(0);
	const [isLiked, setLikeStatus] = useState<boolean>(false);

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

	const addChain = (): void => {
		setShares((prev) => prev + 1);
	};

	useEffect(() => {
		setLikes(reply.counter.likes);
		setShares(reply.counter.shares);
	}, [reply]);

	return (
		<div className="flex flex-col justify-center items-center mt-4">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<div className="flex flex-row items-center gap-3">
					<User index={reply.userIndex} />
					<p className="text-sm text-gray-400">
						{getCurrentTime()} {/* Temporary Time */}
					</p>
				</div>

				<ReplyContent content={reply.content} />

				<div className="flex w-full justify-between items-end">
					<div>
						<DropDownButton Icon={FaChevronDown} onClick={handleDropdownClick} count={0} />
					</div>
					<div className="flex gap-4 text-[#808080] items-center select-none hover:cursor-pointer">
						<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
						<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} />
						<ReplyButton onClick={openReply} />
					</div>
				</div>
			</div>
			{subReplies.length > 0 && showSubReplies && <ReplyDropdown replies={subReplies} />}
			{willReply && <ReplyInputContainer User={<User index={reply.userIndex} />} openReply={openReply} />}
		</div>
	);
};

export default ReplyContainer;
