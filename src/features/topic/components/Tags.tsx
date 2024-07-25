import React from "react";

interface TagsProps {
	tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
	return (
		<div className="flex text-[#0096FB] text-xs leading-none mt-1 mb-3 gap-1">
			{tags.map((tag, i) => {
				return (
					<a href={`/topic/${tag.substring(1)}`} key={i}>
						{i !== tags.length - 1 ? `${tag},` : tag}
					</a>
				);
			})}
		</div>
	);
};

export default Tags;
