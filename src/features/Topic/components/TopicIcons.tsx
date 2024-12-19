import { LIKE_TOPIC, SHARE_TOPIC, Topic } from "../utils/defs";
import ReplyButton from "./ReplyButton";
import TopicButton from "./TopicButton";
import { useMutation } from "@apollo/client";
import { AuthContext } from "@components/auth";
import { Button } from "@components/button";
import { useFormattedActivity } from "@hooks/use-formatted-activity";
import React, { useState, useEffect, useContext } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaCalendar, FaEye, FaPen } from "react-icons/fa6";
import { toast } from "sonner";

interface TopicIconsProps extends Topic {
	openCreateReply: React.MouseEventHandler;
	openEditTopic: React.MouseEventHandler;
}

const TopicIcons: React.FC<TopicIconsProps> = ({
	openCreateReply,
	openEditTopic,
	id,
	counter,
	activity,
	userStatus,
}) => {
	const auth = useContext(AuthContext);

	const formattedActivity = useFormattedActivity(activity);

	const [likes, setLikes] = useState<number>(counter.likes);
	const [isLiked, setLikeStatus] = useState<boolean>(userStatus.isLiked);

	const [shares, setShares] = useState<number>(counter.shares);
	const [isShared, setSharedStatus] = useState<boolean>(userStatus.isShared);

	const [likeTopic] = useMutation(LIKE_TOPIC, { fetchPolicy: "no-cache" });
	const [shareTopic] = useMutation(SHARE_TOPIC);

	useEffect(() => {
		setLikeStatus(userStatus.isLiked);
		setSharedStatus(userStatus.isShared);
	}, [userStatus]);

	const addLike = (): void => {
		if (!auth) {
			toast.warning("You need to login to like a topic!");
			return;
		}

		likeTopic({ variables: { id: id } });

		if (!isLiked) {
			setLikes((prev) => prev + 1);
			setLikeStatus(true);
		} else {
			setLikes((prev) => prev - 1);
			setLikeStatus(false);
		}
	};

	const addChain = (): void => {
		navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}`);
		toast.info("Topic link copied to clipboard!");

		if (auth && !isShared) {
			setShares((prev) => prev + 1);
			setSharedStatus(true);

			shareTopic({ variables: { id: id } });
		}
	};

	useEffect(() => {
		setLikes(counter.likes ?? 0);
		setShares(counter.shares ?? 0);
	}, [counter]);

	return (
		<div className="flex justify-between">
			<div className="flex gap-4 text-gray-500">
				<span className="flex items-center gap-1">
					<FaEye />
					{counter.views}
				</span>
				<span className="flex items-center gap-1">
					<FaCalendar />
					{formattedActivity}
				</span>
			</div>
			<div className="flex select-none items-center justify-end gap-4 hover:cursor-pointer">
				<TopicButton Icon={BiLike} onClick={addLike} count={likes} status={isLiked} />
				<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} status={isShared} />
				{userStatus.isOwner && (
					<Button variant="ghost" onClick={openEditTopic} className="flex items-center gap-2 text-gray-500">
						<FaPen className="text-2xl" />
						Edit
					</Button>
				)}
				<ReplyButton onClick={openCreateReply} />
			</div>
		</div>
	);
};

export default TopicIcons;
