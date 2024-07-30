import React from "react";
import MarkdownRenderer from "../../../components/MarkdownRenderer";

interface PreviewProps {
	preview: string;
}

const Preview: React.FC<PreviewProps> = ({ preview }) => {
	return (
		<div className="max-h-[85vh] w-full overflow-y-scroll">
			<h1 className="select-none font-medium text-gray-700">Preview:</h1>
			<div>
				<MarkdownRenderer content={preview} />
			</div>
		</div>
	);
};

export default Preview;
