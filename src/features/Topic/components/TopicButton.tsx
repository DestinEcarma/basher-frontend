import React from "react";

interface TopicButtonProps {
	Icon: React.ElementType;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	count: number;
	status?: boolean;
}

const TopicButton: React.FC<TopicButtonProps> = ({ Icon, onClick, count, status = false }) => {
	return (
		<div className="flex select-none items-center gap-1 hover:cursor-pointer" onClick={onClick}>
			<Icon color={status ? "#00A3FF" : "#808080"} />
			<p className={status ? "text-[#00A3FF]" : "text-[#808080]"}>{count}</p>
		</div>
	);
};

export default TopicButton;
