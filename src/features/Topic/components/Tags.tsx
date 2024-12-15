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
					<Link to={`/forum?query=%23${tag}`} key={i}>
						{`#${tag}`}
					</Link>
				);
			})}
		</div>
	);
};

export default Tags;
