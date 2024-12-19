import { ReactInputAttributes } from "@utils/defs";
import { forwardRef } from "react";
import { FaCheck } from "react-icons/fa";

interface CheckBoxProps extends ReactInputAttributes {
	label?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ label, name, ...props }, ref) => {
	const boxClassName = [
		"relative h-5 w-5 cursor-pointer",
		"rounded-md border border-gray-500",
		"bg-white transition-colors",
		"[&:has(input:checked)]:border-none",
		"[&:has(input:checked)]:bg-blue-500",
	];

	const iconClassName = [
		"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
		"text-sm text-white opacity-0 transition-opacity peer-checked:opacity-100",
	];

	return (
		<div className="flex items-center gap-2 [&:has(label:hover)>label]:border-blue-500">
			<label htmlFor={name} className={boxClassName.join(" ")}>
				<input
					type="checkbox"
					id={name}
					ref={ref}
					name={name}
					{...props}
					className="peer h-full w-full appearance-none"
				/>
				<FaCheck className={iconClassName.join(" ")} />
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
