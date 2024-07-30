import ReplyInputIcons from "./ReplyInputIcons";
import React, { SetStateAction, useRef } from "react";

interface ReplyTextProps {
	changePreview: React.ChangeEventHandler<HTMLTextAreaElement>;
	preview: string;
	setPreview: React.Dispatch<SetStateAction<string>>;
}

const ReplyText: React.FC<ReplyTextProps> = ({ changePreview, preview, setPreview }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="relative">
			<textarea
				ref={textareaRef}
				className="max-h-[85vh] min-h-80 w-full min-w-96 resize-none overflow-y-scroll rounded-md border-2 border-gray-200 p-2 pt-8 text-[#808080] outline-blue-300 placeholder:text-gray-400"
				placeholder="Type here. Use Markdown or HTML to format."
				name="reply"
				id="reply"
				value={preview}
				onChange={changePreview}
			></textarea>
			<ReplyInputIcons setPreview={setPreview} textareaRef={textareaRef} />
		</div>
	);
};

export default ReplyText;
