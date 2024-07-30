import { ReactInputAttributes, ReactLabelAttributes } from "@utils/defs";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckBoxProps {
	label?: string;
	checked: boolean;
	name: ReactInputAttributes["name"];
	onChange: ReactInputAttributes["onChange"];
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, name, onChange }) => {
	const boxClassName: ReactLabelAttributes["className"] = [
		"relative",
		"h-5",
		"w-5",
		"cursor-pointer",
		"rounded-md",
		"border",
		"border-gray-500",
		"bg-white",
		"transition-colors",
		"data-[checked='true']:border-none",
		"data-[checked='true']:bg-blue-500",
	].join(" ");

	return (
		<div className="flex items-center gap-2 [&:has(label:hover)>label]:border-blue-500">
			<label data-checked={checked} htmlFor={name} className={boxClassName}>
				<input
					type="checkbox"
					name={name}
					id={name}
					onChange={onChange}
					className="h-full w-full appearance-none"
				/>
				{checked && (
					<FaCheck className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white" />
				)}
			</label>
			{label && (
				<label htmlFor={name} className="text-sm hover:cursor-pointer">
					{label}
				</label>
			)}
		</div>
	);
};

export default CheckBox;
