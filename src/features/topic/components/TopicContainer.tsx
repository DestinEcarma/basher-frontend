import React from "react";
import User from "./User";

const TopicContainer: React.FC = () => {
	const header: string = "I got molested by sir godwin...";
	const tags: string[] = ["#hate", "#usc", "#godwin"];
	const title: string = "Lorem Ipsum";
	const content: string =
		"Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas?";

	return (
		<div className="flex justify-center mt-[2.813rem]">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md p-5">
				<h1 className="font-bold text-3xl leading-none">{header}</h1>
				<div className="flex text-[#0096FB] text-sm leading-none mt-1 mb-3 gap-1">
					{tags.map((tag, i) => {
						return (
							<a href={`/topic/${tag.substring(1)}`} key={i}>
								{i !== tags.length - 1 ? `${tag},` : tag}
							</a>
						);
					})}
				</div>
				<User id={0} isOP={true} />

				<div className="mt-4 mb-10 flex flex-col gap-5">
					<h1 className="font-bold text-2xl leading-none">{title}</h1>
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
};

export default TopicContainer;
