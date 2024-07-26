import React from "react";
import User from "./User";
import ReplyContent from "./ReplyContent";
import ReplyIcons from "./ReplyIcons";

const ReplyContainer: React.FC = () => {
	return (
		<div className="flex justify-center mt-4">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<User id={1} isOP={false} />
				{/* insert date and time */}
				<ReplyContent />

				<ReplyIcons />
			</div>
		</div>
	);
};

export default ReplyContainer;
