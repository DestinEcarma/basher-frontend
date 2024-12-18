import { mergeClasses } from "@utils/helper";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

interface UserProps extends VariantProps<typeof variants> {
	identity: number;
	isOwner: boolean;
}

const variants = cva("flex items-center justify-center rounded-full bg-accent px-2 py-1 text-white", {
	variants: {
		variant: {
			parent: "bg-white p-0 font-medium text-[#808080]",
		},
	},
});

const User: React.FC<UserProps> = ({ variant, identity, isOwner }) => {
	return (
		<div className="flex select-none items-center gap-2 text-xs">
			<span className={mergeClasses(variants({ variant }))}>Anonymous #{identity}</span>
			{isOwner && <span className="text-[#808080]">You</span>}
			{identity === 0 && <span className="font-bold text-[#00A3FF]">OP</span>}
		</div>
	);
};

export default User;
