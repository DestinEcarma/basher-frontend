import { Button } from "@components/button";
import React from "react";
import { FaReply } from "react-icons/fa6";

interface ReplyButtonProps {
	onClick?: React.MouseEventHandler;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
	return (
		<Button variant="ghost" className="flex items-center gap-2 text-gray-500" onClick={onClick}>
			<FaReply className="text-2xl" />
			Reply
		</Button>
	);
};

export default ReplyButton;
