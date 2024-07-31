import ReplyText from "../Topic/components/ReplyText";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
					className="flex items-center rounded-md bg-black p-1 text-xs text-white"
					onClick={handleNewTopicClick}
				>
					<FaPlus className="mr-1" />
					<p>New Topic</p>
				</button>
			</div>
			{showReplyInput && (
				<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
					<div className="w-11/12 max-w-2xl rounded-lg bg-white p-6">
						<h2 className="mb-4 text-lg font-bold">Create New Topic</h2>
						<ReplyText changePreview={changePreview} preview={preview} setPreview={setPreview} />
						<div className="mt-4 flex justify-end">
							<button
								className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
								onClick={handleCloseReply}
							>
								Cancel
							</button>
							<button className="rounded bg-blue-500 px-4 py-2 text-white">Submit</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddNewTopic;
