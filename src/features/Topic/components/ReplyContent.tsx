import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

const ReplyContent: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-5">
			<MarkdownRenderer content={content} />
		</div>
	);
};

export default ReplyContent;
