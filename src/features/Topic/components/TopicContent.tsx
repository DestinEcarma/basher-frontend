import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

interface ContentProps {
	content: string;
}

const TopicContent: React.FC<ContentProps> = ({ content }) => {
	return (
		<div className="mt-4 mb-8 flex flex-col gap-5">
			<MarkdownRenderer content={content} />
		</div>
	);
};

export default TopicContent;
