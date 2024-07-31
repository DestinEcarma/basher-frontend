import { mergeClasses } from "@utils/helper";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

interface UserProps extends VariantProps<typeof variants> {
	index: number;
}

const variants = cva("flex items-center justify-center rounded-full bg-accent px-2 py-1 text-white", {
	variants: {
		variant: {
			parent: "bg-white px-1 font-medium text-[#808080]",
		},
	},
});

const User: React.FC<UserProps> = ({ variant, index }) => {
	return (
		<div className="flex select-none items-center gap-1 text-xs leading-none">
			<h1 className={mergeClasses(variants({ variant }))}>Anonymous #{index}</h1>
			{index === 0 && <h1 className="font-bold text-[#00A3FF]">OP</h1>}
		</div>
	);
};

export default User;
