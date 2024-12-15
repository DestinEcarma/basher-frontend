import React from "react";
import { LuReply } from "react-icons/lu";

interface ReplyButtonProps {
	onClick?: React.MouseEventHandler;
	color?: string;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick, color }) => {
	const defaultColor: string = "#808080";

	return (
		<button
			onClick={onClick}
			className="flex select-none items-center gap-2 rounded-lg px-3 py-1 duration-100 hover:cursor-pointer hover:bg-gray-100"
		>
			<LuReply color={color || defaultColor} className="size-7" />
			<p>Reply</p>
		</button>
	);
};

export default ReplyButton;
