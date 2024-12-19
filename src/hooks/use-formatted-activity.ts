import { formatDate } from "@utils/helper";
import { useEffect, useState } from "react";

export const useFormattedActivity = (activity: string) => {
	const [formattedActivity, setFormattedActivity] = useState<string>();

	useEffect(() => {
		let id: number | undefined = undefined;

		const updateFormattedActivity = () => {
			const now = new Date();
			const createdAt = new Date(activity);

			const diff = (now.getTime() - createdAt.getTime()) / 1000;

			if (diff < 3600) {
				id = setTimeout(updateFormattedActivity, (60 - Math.floor((diff % 60000) / 1000)) * 1000);
			} else if (diff < 86400) {
				id = setTimeout(updateFormattedActivity, (3600 - Math.floor((diff % 3600000) / 60000)) * 60000);
			} else if (diff < 2592000) {
				const remaningSeconds = 86400 - Math.floor((diff % 86400000) / 3600000);

				if (remaningSeconds < 3600) {
					id = setTimeout(updateFormattedActivity, remaningSeconds * 60000);
				}
			} else if (diff < 946080000) {
				const remaningSeconds = 2592000 - Math.floor((diff % 2592000000) / 86400000);

				if (remaningSeconds < 3600) {
					id = setTimeout(updateFormattedActivity, remaningSeconds * 3600000);
				}
			}

			setFormattedActivity(formatDate(createdAt));
		};

		updateFormattedActivity();

		return () => clearTimeout(id);
	}, [activity]);

	return formattedActivity;
};
