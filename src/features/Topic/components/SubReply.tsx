import User from "./User";
import React from "react";

interface SubReplyProps {
	userIndex: number;
	content: string;
	timestamp: Date;
}

const SubReply: React.FC<SubReplyProps> = ({ userIndex, content }) => {
	return (
		<div className="subreply mt-3 flex w-full flex-col justify-center gap-3 rounded-md bg-white px-4 pb-5 pt-5 shadow-lg">
			<User index={userIndex} isOP={false} />
			<p className="content">{content}</p>
			{/* <p className="timestamp">{timestamp.toString()}</p>	 */}
		</div>
	);
};

export default SubReply;
