import { ReactButtonAttributes } from "@utils/defs";
import { mergeClasses } from "@utils/helper";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

interface ButtonProps extends ReactButtonAttributes, VariantProps<typeof variants> {}

const variants = cva(
	"rounded-lg p-2 text-center font-bold text-white shadow transition-[background-color,box-shadow] focus:ring",
	{
		variants: {
			variant: {
				primary: "bg-gray-950 ring-gray-500 hover:bg-gray-800 focus:bg-gray-800",
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
