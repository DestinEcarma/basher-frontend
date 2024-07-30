import React from "react";
import { LuReply } from "react-icons/lu";

interface ReplyButtonProps {
	onClick?: React.MouseEventHandler;
	className?: string;
	color?: string;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick, className, color }) => {
	const defaultColor: string = "#808080";

	return (
		<div
			onClick={onClick}
			className={`flex select-none items-center hover:cursor-pointer ${className}`}
			style={{ color: color || defaultColor }}
		>
			<LuReply color={color || defaultColor} className="size-7" />
			<p>Reply</p>
		</div>
	);
};

export default ReplyButton;
