import { ForumTopic } from "../utils/defs";
import { formatDate } from "../utils/helper";
import { formatNumber } from "@utils/helper";
import React from "react";
import { Link } from "react-router-dom";

type TopicRowProps = ForumTopic;

const TopicRow: React.FC<TopicRowProps> = ({ id, title, tags, activity, counter: { likes, replies } }) => {
	const tableData = [formatNumber(replies), formatNumber(likes), formatDate(new Date(activity))];

	return (
		<tr className="border-b">
			<td className="py-2">
				<div className="flex flex-col">
					<Link to={`/topic/${id}`} className="w-fit text-xl font-bold">
						{title}
					</Link>
				</div>
				<div className="flex gap-2">
					{tags.map((tag, key) => (
						// TODO: Convert to a link
						<span key={key} className="text-sm text-blue-500">
							#{tag}
						</span>
					))}
				</div>
			</td>
			{tableData.map((data, key) => (
				<td key={key} className="text-center font-medium text-gray-500">
					{data}
				</td>
			))}
		</tr>
	);
};

export default TopicRow;
