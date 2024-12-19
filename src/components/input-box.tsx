import { LeftSide, RightSide } from "./sides";
import { ReactInputAttributes, ReactLabelAttributes } from "@utils/defs";
import { mergeClasses } from "@utils/helper";
import React, { forwardRef } from "react";

export interface InputBoxProps extends Omit<ReactInputAttributes, "type"> {
	label?: string;
	error?: string;
	type?: Exclude<ReactInputAttributes["type"], "radio" | "checkbox">;
}

export type InputBoxPropsNoRef = Omit<InputBoxProps, "ref">;

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(({ error, name, label, ...props }, ref) => {
	const [customLabel, setCustomLabel] = React.useState<React.ReactNode>(null);

	React.Children.forEach(props.children, (child) => {
		if (React.isValidElement(child) && child.type === InputLabel) {
			setCustomLabel(child);
		}
	});

	return (
		<div className="flex flex-col gap-2">
			{customLabel ?? (label && <InputLabel htmlFor={name}>{label}</InputLabel>)}
			<InputField id={name} name={name} placeholder={label} ref={ref} {...props} />
			{error && <p className="text-xs text-red-500">{error}</p>}
		</div>
	);
});

export const InputLabel = forwardRef<HTMLLabelElement, ReactLabelAttributes>(
	({ children, className, ...props }, ref) => {
		return (
			<label
				className={mergeClasses(["w-fit text-sm font-medium hover:cursor-pointer", className])}
				{...props}
				ref={ref}
			>
				{children}
			</label>
		);
	},
);

type FieldInputProps = Omit<InputBoxProps, "label" | "error">;

const InputField = forwardRef<HTMLInputElement, FieldInputProps>(({ className, children, ...props }, ref) => {
	let leftSide: React.ReactNode = undefined;
	let rightSide: React.ReactNode = undefined;

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) return;

		if (child.type === LeftSide) {
			leftSide = child;
		} else if (child.type === RightSide) {
			rightSide = child;
		}
	});

	return (
		<div className="flex items-center gap-2 rounded-lg border p-2 shadow transition-colors [&:has(input:focus)]:border-blue-500">
			{leftSide}
			<input className={mergeClasses(["w-full text-sm", className])} {...props} ref={ref} />
			{rightSide}
		</div>
	);
});
