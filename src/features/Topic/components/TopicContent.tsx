import { DEFAULT_PREVIEW_OPTIONS } from "@components/create-post/defs";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface ContentProps {
	content: string;
}

const TopicContent: React.FC<ContentProps> = ({ content }) => {
	return (
		<div className="mb-8 mt-4 flex flex-col gap-1">
			<MDEditor.Markdown source={content} {...DEFAULT_PREVIEW_OPTIONS} />
		</div>
	);
};

export default TopicContent;
