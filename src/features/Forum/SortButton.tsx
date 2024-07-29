import React from "react";

interface SortButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, isActive, onClick }) => (
	<button
		onClick={onClick}
		className={`mr-2 rounded-md px-2 py-1 text-xs ${isActive ? "bg-gray-300 text-black" : "text-black-500"}`}
	>
		{label}
	</button>
);

export default SortButton;
