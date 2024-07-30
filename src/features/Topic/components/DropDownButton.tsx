import React from "react";

interface DropDownButtonProps {
	Icon: React.ElementType;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	count: number;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ Icon, onClick, count }) => {
	return (
		<button
			className="flex select-none items-center gap-1 rounded-lg px-3 py-1 duration-100 hover:cursor-pointer hover:bg-gray-100"
			onClick={onClick}
		>
			<p className="text-[#808080]">{count} Replies</p>
			<Icon className="text-[#808080]" />
		</button>
	);
};

export default DropDownButton;
