import { ReplyProps } from "../services/getreplies";
import DropDownButton from "./DropDownButton";
import ReplyButton from "./ReplyButton";
import ReplyContent from "./ReplyContent";
import ReplyDropdown from "./ReplyDropDown";
import ReplyInputContainer from "./ReplyInputContainer";
import TopicButton from "./TopicButton";
import User from "./User";
import { useLazyQuery } from "@apollo/client";
import { GET_SUB_REPLIES } from "@graphql/queries";
import React, { useEffect, useState } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { LuReply } from "react-icons/lu";
import { NavLink } from "react-router-dom";

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
	const [subReplies, setSubReplies] = useState<
		{
			id: number;
			userIndex: number;
			content: string;
			timestamp: Date;
		}[]
	>([]);

	const [getSubReplies] = useLazyQuery(GET_SUB_REPLIES);

	useEffect(() => {
		async function fetchSubReplies() {
			if (showSubReplies) {
				const { data } = await getSubReplies({
					variables: {
						input: {
							id: reply.id,
							offset: 0,
						},
					},
				});
				setSubReplies(data.reply.getFromReply);
			} else {
				setSubReplies([]);
			}
		}

		fetchSubReplies();
	}, [showSubReplies, reply, getSubReplies]);

	const openReply: React.MouseEventHandler = () => {
		setWillReply((prev) => !prev);
	};

	const handleDropdownClick: React.MouseEventHandler = () => {
		console.log(showSubReplies);
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
		<div className="mt-4 flex flex-col items-center justify-center">
			<div
				className="w-full rounded-md bg-white px-4 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl"
				id={reply.id}
			>
				<div className="flex flex-row items-center justify-between">
					<div className="flex gap-3">
						<User index={reply.userIndex} />
						<p className="text-sm text-gray-400">
							{getCurrentTime()} {/* Temporary Time */}
						</p>
					</div>
					{reply.parent != null && (
						<NavLink to={`#${reply.parent.id}`} className="flex">
							<LuReply className="-scale-x-100" color="#808080" />
							<User index={reply.parent.userIndex} variant="parent" />
						</NavLink>
					)}
				</div>

				<ReplyContent content={reply.content} />

				<div
					className={`flex w-full items-end ${reply.counter.replies === 0 ? "justify-end" : "justify-between"}`}
				>
					{reply.counter.replies === 0 || (
						<div>
							<DropDownButton
								Icon={FaChevronDown}
								onClick={handleDropdownClick}
								count={reply.counter.replies}
								showSubReplies={showSubReplies}
							/>
						</div>
					)}
					<div className="flex select-none items-center gap-4 text-[#808080] hover:cursor-pointer">
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
