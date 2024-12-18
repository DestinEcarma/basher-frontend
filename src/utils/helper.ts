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

export const formatDate = (date: Date): string => {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const diffYears = now.getFullYear() - date.getFullYear();

	if (diffMinutes < 60) {
		return `${diffMinutes}m`;
	} else if (diffHours < 24) {
		return `${diffHours}h`;
	} else if (diffDays < 30) {
		return `${diffDays}d`;
	} else if (diffYears < 1) {
		return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
	} else {
		return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
	}
};
