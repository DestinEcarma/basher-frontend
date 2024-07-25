import React from "react";
import User from "./User";
import Tags from "./Tags";
import TopicContent from "./TopicContent";
import TopicIcons from "./TopicIcons";

const TopicContainer: React.FC = () => {
	const header: string = "I got molested by sir godwin...";
	const tags: string[] = ["#hate", "#usc", "#godwin"];
	const title: string = "Lorem Ipsum";
	const content: string =
		"Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas? Est asperiores fugiat At sunt voluptas rem laboriosam eligendi. Cum consequatur nobis ut dolorum suscipit qui illum  praesentium eos molestiae odit ut pariatur voluptas?";

	return (
		<div className="flex justify-center mt-[2.813rem]">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3">
				<h1 className="font-bold text-2xl leading-none">{header}</h1>
				<Tags tags={tags} />
				<User id={0} isOP={true} />

				<TopicContent title={title}>
					<p>{content}</p>
				</TopicContent>

				<TopicIcons />
			</div>
		</div>
	);
};

export default TopicContainer;
