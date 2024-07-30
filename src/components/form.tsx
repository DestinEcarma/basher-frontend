import { mergeClasses } from "@utils/helper";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, "size">, VariantProps<typeof variants> {}

const variants = cva(
	"fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-lg mx-2",
	{
		variants: {
			size: {
				w450px: "max-w-[450px]",
			},
		},
	},
);

const Form: React.FC<FormProps> = ({ size, className, ...props }) => {
	return <form className={mergeClasses(variants({ size, className }))} {...props} />;
};

export default Form;
