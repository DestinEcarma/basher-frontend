import MarkdownRenderer from "../../../components/MarkdownRenderer";
import React from "react";

const ReplyContent: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-5">
			<MarkdownRenderer content={content} />
		</div>
	);
};

export default ReplyContent;
