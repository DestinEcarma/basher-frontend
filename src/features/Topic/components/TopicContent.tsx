import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface ContentProps {
	content: string;
}

const TopicContent: React.FC<ContentProps> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-5">
			{/* <MarkdownRenderer content={content} /> */}
			<MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} />
		</div>
	);
};

export default TopicContent;
