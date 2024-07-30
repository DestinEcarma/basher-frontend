import MarkdownRenderer from "../../../components/MarkdownRenderer";
import React from "react";

interface ContentProps {
	content: string;
}

const TopicContent: React.FC<ContentProps> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-5">
			<MarkdownRenderer content={content} />
		</div>
	);
};

export default TopicContent;
