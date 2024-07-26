import React, { useState } from "react";
import User from "./User";
import ReplyContent from "./ReplyContent";
import ReplyIcons from "./ReplyIcons";
import { Reply as ReplyProps } from "../../../utils/sample-data";
import ReplyInputContainer from "./ReplyInputContainer";

interface ReplyContainerProps {
	reply: ReplyProps;
	index: number;
}

function getCurrentTime() {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours}:${minutes}`;
}

const ReplyContainer: React.FC<ReplyContainerProps> = ({ reply, index }) => {
	const [willReply, setWillReply] = useState(false);

	const openReply: React.MouseEventHandler = () => {
		setWillReply((prev) => !prev);
	};

	return (
		<div className="flex flex-col justify-center items-center mt-4">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<div className="flex flex-row items-center gap-3">
					<User id={index} isOP={false} />
					<p className="text-sm text-gray-400">
						{getCurrentTime()} {/* Temporary Time */}
					</p>
				</div>
				<ReplyContent content={reply.content} />
				<ReplyIcons openReply={openReply} />
			</div>
			{willReply && <ReplyInputContainer User={<User id={index} isOP={false} />} openReply={openReply} />}
		</div>
	);
};

export default ReplyContainer;
