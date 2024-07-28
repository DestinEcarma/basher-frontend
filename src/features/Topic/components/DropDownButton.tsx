import React from "react";

interface DropDownButtonProps {
	Icon: React.ElementType;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	count: number;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({ Icon, onClick, count }) => {
	return (
		<button
			className="flex items-center gap-1 px-3 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-100 duration-100 select-none"
			onClick={onClick}
		>
			<p className="text-[#808080]">{count} Replies</p>
			<Icon className="text-[#808080]" />
		</button>
	);
};

export default DropDownButton;
