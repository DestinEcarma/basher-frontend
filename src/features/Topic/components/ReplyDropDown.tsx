import SubReply from "./SubReply";
import React from "react";

interface ReplyDropdownProps {
	replies: {
		id: number;
		userIndex: number;
		content: string;
		timestamp: Date;
	}[];
}

const ReplyDropdown: React.FC<ReplyDropdownProps> = ({ replies }) => {
	return (
		<div className="items-stetch mb-5 mt-3 flex w-full flex-row md:max-w-3xl lg:max-w-7xl">
			<div className="ml-10 mt-3 w-auto border-l-4 border-gray-700 p-3"></div>
			<div className="w-full">
				{replies.map((subreply) => (
					<SubReply key={subreply.userIndex} {...subreply} />
				))}
			</div>
		</div>
	);
};

export default ReplyDropdown;
