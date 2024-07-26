import React from "react";

const ReplyContent: React.FC<{ content: string }> = ({ content }) => {
	return <div className="mt-4 mb-8 flex flex-col gap-5">{content}</div>;
};

export default ReplyContent;
