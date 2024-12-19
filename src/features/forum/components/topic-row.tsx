import { ForumTopic } from "../utils/defs";
import { useFormattedActivity } from "@hooks/use-formatted-activity";
import { formatNumber } from "@utils/helper";
import React from "react";
import { Link } from "react-router-dom";

type TopicRowProps = ForumTopic;

const TopicRow = React.forwardRef<HTMLTableRowElement, TopicRowProps>(
	({ id, title, tags, activity, counter: { likes, replies } }, ref) => {
		const formattedActivity = useFormattedActivity(activity);

		const tableData = [formatNumber(replies), formatNumber(likes), formattedActivity];

		return (
			<tr ref={ref} className="border-b">
				<td className="py-2">
					<div className="flex flex-col">
						<Link to={`/topic/${id}`} className="w-fit text-xl font-bold">
							{title}
						</Link>
					</div>
					<div className="flex gap-2">
						{tags.map((tag, key) => (
							<Link to={`/forum?query=%23${tag}`} key={key} className="text-sm text-blue-500">
								#{tag}
							</Link>
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
	},
);

export default TopicRow;
