import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ReplyText from "../Topic/components/ReplyText";

const AddNewTopic: React.FC = () => {
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [preview, setPreview] = useState("");

	const handleNewTopicClick = () => {
		setShowReplyInput(true);
	};

	const handleCloseReply = () => {
		setShowReplyInput(false);
	};

	const changePreview: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setPreview(e.target.value);
	};

	return (
		<>
			<div>
				<button
					className="flex items-center text-xs text-white bg-black p-1 rounded-md"
					onClick={handleNewTopicClick}
				>
					<FaPlus className="mr-1" />
					<p>New Topic</p>
				</button>
			</div>
			{showReplyInput && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl">
						<h2 className="text-lg font-bold mb-4">Create New Topic</h2>
						<ReplyText changePreview={changePreview} preview={preview} setPreview={setPreview} />
						<div className="flex justify-end mt-4">
							<button
								className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
								onClick={handleCloseReply}
							>
								Cancel
							</button>
							<button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddNewTopic;
