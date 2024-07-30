import DOMPurify from "dompurify";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
	className?: string;
	content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ className, content }) => {
	const cleanHTML = DOMPurify.sanitize(content, {
		FORBID_TAGS: ["style"],
		FORBID_ATTR: ["style", "class", "id"],
	});

	return (
		<ReactMarkdown className={className + ` markdown`} rehypePlugins={[rehypeRaw]}>
			{cleanHTML}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
