import { LeftSide, RightSide } from "./sides";
import { ReactInputAttributes } from "@utils/defs";
import React from "react";

interface InputBoxProps extends Omit<ReactInputAttributes, "type"> {
	label?: string;
	error?: string;
	type?: Exclude<ReactInputAttributes["type"], "radio" | "checkbox">;
}

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
	({ error, name, label, children, ...props }, ref) => {
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
					<input ref={ref} id={name} name={name} placeholder={label} {...props} className="w-full text-sm" />
					{rightSide}
				</div>
				{error && <p className="text-xs text-red-500">{error}</p>}
			</div>
		);
	},
);

export default InputBox;
