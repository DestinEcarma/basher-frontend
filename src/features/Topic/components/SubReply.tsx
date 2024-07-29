import React from "react";
import User from "./User";

interface SubReplyProps {
	userIndex: number;
	content: string;
	timestamp: Date;
}

const SubReply: React.FC<SubReplyProps> = ({ userIndex, content }) => {
	return (
		<div className="subreply flex gap-3 flex-col justify-center mt-3 bg-white w-full shadow-lg rounded-md pt-5 px-4 pb-5">
			<User index={userIndex} isOP={false} />
			<p className="content">{content}</p>
			{/* <p className="timestamp">{timestamp.toString()}</p>	 */}
		</div>
	);
};

export default SubReply;
