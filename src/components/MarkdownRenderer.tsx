import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
	className?: string;
	content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ className, content }) => {
	return (
		<ReactMarkdown className={className + ` markdown`} rehypePlugins={[rehypeRaw]}>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
