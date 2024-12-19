import {
	CREATE_REPLY,
	GET_SUB_REPLIES,
	CreateReply,
	Reply,
	LIKE_REPLY,
	SHARE_REPLY,
	UPDATE_REPLY,
} from "../utils/defs";
import DropDownButton from "./DropDownButton";
import ReplyButton from "./ReplyButton";
import ReplyContent from "./ReplyContent";
import ReplyDropdown from "./ReplyDropDown";
import TopicButton from "./TopicButton";
import User from "./User";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AuthContext } from "@components/auth";
import { Button } from "@components/button";
import createPost from "@components/create-post";
import { formatDate } from "@utils/helper";
import React, { useContext, useEffect, useState } from "react";
import { BiLike, BiLinkAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaPen, FaReply } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

interface ReplyContainerProps {
	topicId: string;
	reply: Reply;
}

const ReplyContainer = React.forwardRef<HTMLDivElement, ReplyContainerProps>(({ topicId, reply }, ref) => {
	const auth = useContext(AuthContext);

	const [likes, setLikes] = useState<number>(reply.counter.likes);
	const [isLiked, setLikeStatus] = useState<boolean>(reply.userStatus.isLiked);

	const [shares, setShares] = useState<number>(reply.counter.shares);
	const [isShared, setSharedStatus] = useState<boolean>(reply.userStatus.isShared);

	const [showSubReplies, setShowSubReplies] = useState(false);
	const [subReplies, setSubReplies] = useState<Reply[]>([]);

	const [getSubReplies] = useLazyQuery(GET_SUB_REPLIES);

	const [createReply] = useMutation<CreateReply>(CREATE_REPLY);
	const [likeReply] = useMutation(LIKE_REPLY);
	const [shareReply] = useMutation(SHARE_REPLY);
	const [editReply] = useMutation(UPDATE_REPLY);

	useEffect(() => {
		async function fetchSubReplies() {
			if (showSubReplies) {
				const { data } = await getSubReplies({
					variables: {
						input: {
							topic: topicId,
							reply: reply.id,
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
	}, [showSubReplies, reply, topicId, getSubReplies]);

	useEffect(() => {
		setLikes(reply.counter.likes);
		setShares(reply.counter.shares);
	}, [reply]);

	const onClickCreateSubReply = () => {
		createPost.open({
			mode: "reply",
			postId: reply.id,
			replyUserIdentity: {
				identity: reply.userStatus.identity,
				isOwner: reply.userStatus.isOwner,
			},
			onSubmit: (content) => {
				createReply({
					variables: {
						input: {
							content,
							topic: topicId,
							parent: reply.id,
						},
					},
				});
			},
		});
	};

	const onClickUpdateReply = () => {
		createPost.open({
			mode: "editReply",
			reply,
			onSubmit: (content) => {
				editReply({
					variables: {
						input: {
							topic: topicId,
							reply: reply.id,
							content,
						},
					},
				});
			},
		});
	};

	const handleDropdownClick: React.MouseEventHandler = () => {
		setShowSubReplies((prev) => !prev);
	};

	const addLike = (): void => {
		if (!auth) {
			toast.warning("You need to be logged in to like a reply.");
			return;
		}

		likeReply({ variables: { id: reply.id } });

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

		if (!isShared) {
			setShares((prev) => prev + 1);
			setSharedStatus(true);

			if (auth) {
				shareReply({ variables: { id: reply.id } });
			}
		}
	};

	return (
		<div ref={ref} className="mt-4 flex flex-col items-center justify-center">
			<div
				className="w-full rounded-md bg-white px-6 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl"
				id={reply.id}
			>
				<div className="flex flex-row items-center justify-between">
					<div className="flex gap-3">
						<User identity={reply.userStatus.identity} isOwner={reply.userStatus.isOwner} />
						<p className="text-sm text-gray-400">{formatDate(new Date(reply.activity))}</p>
					</div>
					{reply.parent != null && (
						<NavLink to={`#${reply.parent.id}`} className="flex items-center gap-2">
							<FaReply className="scale-x-[-1]" color="#808080" />
							<User
								identity={reply.userStatus.identity}
								isOwner={reply.userStatus.isOwner}
								variant={"parent"}
							/>
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
						<TopicButton Icon={BiLinkAlt} onClick={addChain} count={shares} status={isShared} />
						{reply.userStatus.isOwner && (
							<Button variant="ghost" className="flex items-center gap-2 text-gray-500" onClick={onClickUpdateReply}>
								<FaPen className="text-2xl" />
								Edit
							</Button>
						)}
						<ReplyButton onClick={onClickCreateSubReply} />
					</div>
				</div>
			</div>
			{subReplies.length > 0 && showSubReplies && <ReplyDropdown replies={subReplies} />}
		</div>
	);
});

export default ReplyContainer;
