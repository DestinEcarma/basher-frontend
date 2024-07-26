import React from "react";

interface ReplyButtonProps {
	Icon: React.ElementType;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	count: number;
	status?: boolean;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ Icon, onClick, count, status = false }) => {
	return (
		<div className="flex items-center gap-1 hover:cursor-pointer select-none px-3 py-1 rounded-lg hover:bg-gray-100 duration-200" onClick={onClick}>
			<p className={status ? "text-[#00A3FF]" : "text-[#808080]"}>Replies {count}</p>
			<Icon color={status ? "#00A3FF" : "#808080"} />
		</div>
	);
};

export default ReplyButton;
