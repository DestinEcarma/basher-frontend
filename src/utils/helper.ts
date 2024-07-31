import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const toggle = (prev: boolean) => !prev;

export const mergeClasses = (...inputs: ClassValue[]) => {
	return twMerge(clsx(...inputs));
};

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const formatNumber = (num: number): string => {
	if (num >= 100000) {
		return `${(num / 1000).toFixed(0)}k`;
	} else if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}k`;
	} else {
		return num.toString();
	}
};
