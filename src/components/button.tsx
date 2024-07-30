import { ReactButtonAttributes } from "@utils/defs";
import { mergeClasses } from "@utils/helper";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

interface ButtonProps extends ReactButtonAttributes, VariantProps<typeof variants> {}

const variants = cva(
	"p-2 font-bold rounded-lg shadow text-white text-center focus:ring transition-[background-color,box-shadow]",
	{
		variants: {
			variant: {
				primary: "bg-gray-950 hover:bg-gray-800 focus:bg-gray-800 ring-gray-500",
				ghost: "bg-transparent text-black shadow-none ring-transparent",
			},
			size: {
				full: "w-full",
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
