import React from "react";
import ReplyButton from "./ReplyButton";

interface ReplyInputContainerProps {
	User: React.ReactElement;
	openReply: React.MouseEventHandler;
}

const ReplyInputContainer: React.FC<ReplyInputContainerProps> = ({ User, openReply }) => {
	return (
		<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3 mt-4">
			<div>
				<div className="flex mb-2 items-center gap-1">
					<h1 className="text-gray-700">Replying to</h1>
					{User}
				</div>
				<textarea
					className="outline-blue-300 w-full h-40 min-h-20 rounded-md border-gray-200 border-2 p-2 placeholder:text-gray-400"
					placeholder="Type here. Use Markdown or HTML to format."
					name="reply"
					id="reply"
				></textarea>
				<div className="flex mt-2 items-center gap-4">
					<ReplyButton
						color="#FFFFFF"
						className="bg-accent hover:bg-accent-light transition-colors py-1 px-2 rounded-md"
					/>
					<p onClick={openReply} className="text-[#808080] hover:cursor-pointer">
						Close
					</p>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default ReplyInputContainer;
