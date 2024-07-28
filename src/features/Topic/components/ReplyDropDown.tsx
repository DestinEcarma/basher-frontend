import React from "react";
import SubReply from "./SubReply";
import { SubReply as SubReplyProps } from "../../../utils/sample-data";

interface ReplyDropdownProps {
	replies: SubReplyProps[];
}

const ReplyDropdown: React.FC<ReplyDropdownProps> = ({ replies }) => {
	return (
		<div>
			{replies.map((subreply) => (
				<SubReply key={subreply.author} {...subreply} />
			))}
		</div>
	);
};

export default ReplyDropdown;
