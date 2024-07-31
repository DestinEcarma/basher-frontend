import React from "react";
import { Link } from "react-router-dom";

interface TagsProps {
	tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
	return (
		<div className="mb-3 mt-1 flex gap-1 text-xs leading-none text-[#0096FB]">
			{tags.map((tag, i) => {
				return (
					<Link to={`/topic/${tag.substring(1)}`} key={i}>
						{i !== tags.length - 1 ? `#${tag},` : `#tag`}
					</Link>
				);
			})}
		</div>
	);
};

export default Tags;
