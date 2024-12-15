import MDEditor from "@uiw/react-md-editor";
import React from "react";

const ReplyContent: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-5">
			<MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} />
		</div>
	);
};

export default ReplyContent;
