import { getRandomInt } from "@utils/helper";
import clsx from "clsx";
import React from "react";

const TopicSkeleton: React.FC = () => {
	const titleWidthClassName = ["w-5/6", "w-3/4", "w-2/3", "w-1/2", "w-1/3", "w-1/4", "w-1/5"];

	return (
		<tr className="border-b">
			<td className="py-2">
				<div className="flex flex-col gap-2">
					<div
						className={clsx([
							"h-6 rounded-full bg-gray-300",
							titleWidthClassName[getRandomInt(titleWidthClassName.length)],
						])}
					></div>
					<div className="flex gap-1">
						{new Array(getRandomInt(5)).fill(null).map((_, key) => (
							<div key={key} className="h-4 w-12 rounded-full odd:bg-gray-200 even:bg-gray-300"></div>
						))}
					</div>
				</div>
			</td>
			{new Array(3).fill(null).map((_, key) => (
				<td key={key} className="group px-2">
					<div className="mx-auto h-6 w-full rounded-full group-odd:bg-gray-300 group-even:bg-gray-200"></div>
				</td>
			))}
		</tr>
	);
};

export default TopicSkeleton;
