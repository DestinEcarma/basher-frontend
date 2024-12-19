import { Button } from "./button";
import { ReactButtonAttributes } from "@utils/defs";
import { mergeClasses } from "@utils/helper";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { FaBold } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export interface LogoProps extends ReactButtonAttributes, VariantProps<typeof variants> {}

const variants = cva(null, {
	variants: {
		size: {
			sm: "size-8 text-2xl",
			lg: "size-11 text-4xl",
			xl: "size-[4.25rem] text-6xl",
		},
	},
});

export const Logo: React.FC<LogoProps> = ({ size, className }) => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/forum");
	};

	return (
		<Button
			onClick={onClick}
			variant="ghost"
			className={mergeClasses(
				"flex flex-grow-0 select-none items-center p-0 pr-2 font-roboto-mono text-2xl font-bold leading-none tracking-wide",
				variants({ size, className }).replace(/size-\[.*?\]|data-\d+/g, ""),
			)}
		>
			<span
				className={mergeClasses(
					"flex size-8 items-center justify-center rounded-lg bg-black text-2xl leading-none text-white",
					variants({ size }),
				)}
			>
				<FaBold />
			</span>
			<span>asher</span>
		</Button>
	);
};
