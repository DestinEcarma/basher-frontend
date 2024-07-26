import React, { SetStateAction, useRef } from "react";
import ReplyInputIcons from "./ReplyInputIcons";

interface ReplyTextProps {
	changePreview: React.ChangeEventHandler<HTMLTextAreaElement>;
	preview: string;
	setPreview: React.Dispatch<SetStateAction<string>>;
}

const ReplyText: React.FC<ReplyTextProps> = ({changePreview, preview, setPreview}) => {

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="relative">
			<textarea
				ref = {textareaRef}
				className="outline-blue-300 w-full min-w-96 min-h-40 rounded-md border-gray-200 border-2 p-2 pt-8 placeholder:text-gray-400 text-[#808080]"
				placeholder="Type here. Use Markdown or HTML to format."
				name="reply"
				id="reply"
				value={preview}
				onChange={changePreview}
			></textarea>
			<ReplyInputIcons setPreview = {setPreview} textareaRef = {textareaRef} />
		</div>
	)
}

export default ReplyText;