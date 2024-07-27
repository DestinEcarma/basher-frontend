import React from "react";
import { FaPlus } from "react-icons/fa";

const AddNewTopic: React.FC = () => {
	return (
		<div>
			<button className="flex items-center text-xs text-white bg-black p-1 rounded-md">
				<FaPlus className="mr-1" />
				<p>New Topic</p>
			</button>
		</div>
	);
};

export default AddNewTopic;
