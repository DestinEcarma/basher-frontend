import React from "react";
import User from "./User";

interface SubReplyProps {
	author: string;
	content: string;
	timestamp: Date;
}

const SubReply: React.FC<SubReplyProps> = ({ author, content }) => {
	return (
		<div className="subreply">
			<User author={author} isOP={false} />
			<p className="content">{content}</p>
			{/* <p className="timestamp">{timestamp.toString()}</p>	 */}
		</div>
	);
};

export default SubReply;
