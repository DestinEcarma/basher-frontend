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
