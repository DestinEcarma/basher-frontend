import JumpToButton from "./JumpToButton";
import User from "./User";
import MarkdownRenderer from "@components/MarkdownRenderer";
import React from "react";

interface SubReplyProps {
	id: number;
	userIndex: number;
	content: string;
	timestamp: Date;
}

const SubReply: React.FC<SubReplyProps> = ({ userIndex, content }) => {
	return (
		<div className="subreply mt-3 flex w-full flex-col justify-center gap-3 rounded-md bg-white px-4 pb-5 pt-5 shadow-lg">
			<User index={userIndex} />
			<div className="content flex w-full flex-col gap-5">
				<MarkdownRenderer content={content} />
			</div>
			<JumpToButton replyId="1">Jump to Reply</JumpToButton>
		</div>
	);
};

export default SubReply;
