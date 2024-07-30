import React from "react";
import { LeftSide, RightSide } from "./sides";
import { Children, ReactInputAttributes } from "@utils/defs";

interface InputBoxProps extends Children {
	label?: string;
	error?: string;
	name?: ReactInputAttributes["name"];
	value?: ReactInputAttributes["value"];
	required?: ReactInputAttributes["required"];
	type?: Exclude<ReactInputAttributes["type"], "radio" | "checkbox">;
	onChange?: ReactInputAttributes["onChange"];
}

const InputBox: React.FC<InputBoxProps> = ({ error, name, label, children, ...props }) => {
	const leftSide = [] as React.ReactNode[];
	const rightSide = [] as React.ReactNode[];

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) {
			return;
		}

		if (child.type === LeftSide) {
			leftSide.push(child);
		} else if (child.type === RightSide) {
			rightSide.push(child);
		}
	});

	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label htmlFor={name} className="w-fit text-sm font-medium hover:cursor-pointer">
					{label}
				</label>
			)}
			<div className="flex items-center gap-2 rounded-lg border p-2 shadow transition-colors [&:has(input:focus)]:border-blue-500">
				{leftSide}
				<input id={name} name={name} placeholder={label} {...props} className="w-full text-sm" />
				{rightSide}
			</div>
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
};

export default InputBox;
