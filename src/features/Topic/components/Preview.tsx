import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

interface PreviewProps {
	preview: string;
}

const Preview: React.FC<PreviewProps> = ({ preview }) => {
	return (
		<div className="w-full">
			<h1 className="text-gray-700 font-medium select-none">Preview:</h1>
			<div>
				<MarkdownRenderer content={preview} />
			</div>
		</div>
	);
};

export default Preview;
