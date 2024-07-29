import React from "react";
import SubReply from "./SubReply";

interface ReplyDropdownProps {
	replies: {
		userIndex: number;
		content: string;
		timestamp: Date;
	}[];
}

const ReplyDropdown: React.FC<ReplyDropdownProps> = ({ replies }) => {
	return (
		<div className="flex flex-row items-stetch lg:max-w-7xl md:max-w-3xl w-full mt-3 mb-5">
			<div className="border-l-4 border-gray-700 w-auto ml-10 mt-3 p-3"></div>
			<div>
				{replies.map((subreply) => (
					<SubReply key={subreply.userIndex} {...subreply} />
				))}
			</div>
		</div>
	);
};

export default ReplyDropdown;
//fix
