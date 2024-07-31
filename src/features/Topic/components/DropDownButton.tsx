import React from "react";

interface DropDownButtonProps {
	Icon: React.ElementType;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	count: number;
	showSubReplies: boolean;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ Icon, onClick, count, showSubReplies }) => {
	return (
		<button
			className="flex select-none items-center gap-2 rounded-lg px-3 py-1 duration-100 hover:cursor-pointer hover:bg-gray-100"
			onClick={onClick}
		>
			<p className="text-[#808080]">{count} Replies</p>
			<Icon className={`size-3 text-[#808080] ${showSubReplies ? "rotate-180" : ""}`} />
		</button>
	);
};

export default DropDownButton;
