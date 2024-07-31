import { Topic } from "../utils/defs";
import { formatDate } from "../utils/helper";
import { formatNumber } from "@utils/helper";
import React from "react";
import { Link } from "react-router-dom";

interface TopicRowProps extends Topic {}

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
				{tags.map((tag) => (
					// TODO: Convert to a link
					<span className="text-sm text-blue-500">#{tag}</span>
				))}
			</td>
			{tableData.map((data) => (
				<td className="text-center font-medium text-gray-500">{data}</td>
			))}
		</tr>
	);
};

export default TopicRow;
