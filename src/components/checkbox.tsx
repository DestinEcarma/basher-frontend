import React from "react";
import { FaCheck } from "react-icons/fa";
import { ReactInputAttributes, ReactLabelAttributes } from "@utils/defs";

interface CheckBoxProps extends ReactInputAttributes {
	label?: string;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({ label, name, ...props }, ref) => {
	const [checked, setChecked] = React.useState(props.value ?? false);

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

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange?.(e);
		setChecked(e.target.checked);
	};

	return (
		<div className="flex items-center gap-2 [&:has(label:hover)>label]:border-blue-500">
			<label data-checked={checked} htmlFor={name} className={boxClassName}>
				<input
					type="checkbox"
					id={name}
					ref={ref}
					name={name}
					{...props}
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
});

export default CheckBox;
