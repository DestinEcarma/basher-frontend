import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const toggle = (prev: boolean) => !prev;

export const mergeClasses = (...inputs: ClassValue[]) => {
	return twMerge(clsx(...inputs));
};
