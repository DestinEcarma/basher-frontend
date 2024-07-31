import { ReactButtonAttributes } from "@utils/defs";
import { mergeClasses } from "@utils/helper";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

interface ButtonProps extends ReactButtonAttributes, VariantProps<typeof variants> {}

const variants = cva(
	[
		"cursor-pointer rounded-lg p-2 shadow-md",
		"text-center font-bold text-white",
		"transition-[background-color,box-shadow] focus:ring",
		"disabled:cursor-default disabled:bg-gray-400",
	],
	{
		variants: {
			variant: {
				primary: "bg-gray-950 ring-gray-500 hover:bg-gray-800 focus:bg-gray-800",
				ghost: "bg-transparent text-black shadow-none ring-transparent hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-transparent",
			},
			size: {
				["w-full"]: "w-full",
				sm: "text-sm",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

const Button: React.FC<ButtonProps> = ({ size, variant, className, ...props }) => {
	return <button className={mergeClasses(variants({ variant, size, className }))} {...props} />;
};

export default Button;
