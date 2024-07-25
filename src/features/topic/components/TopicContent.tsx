import React from "react";

interface ContentProps {
	title: string;
	children?: React.ReactNode;
}

const TopicContent: React.FC<ContentProps> = ({ title, children }) => {
	return (
		<div className="mt-4 mb-8 flex flex-col gap-5">
			<h1 className="font-bold text-xl leading-none">{title}</h1>
			{children}
		</div>
	);
};

export default TopicContent;
