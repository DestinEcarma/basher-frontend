import React from "react";

interface TagsProps {
	tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
	return (
		<div className="mb-3 mt-1 flex gap-1 text-xs leading-none text-[#0096FB]">
			{tags.map((tag, i) => {
				return (
					<a href={`/topic/${tag.substring(1)}`} key={i}>
						{i !== tags.length - 1 ? `#${tag},` : `#tag`}
					</a>
				);
			})}
		</div>
	);
};

export default Tags;
