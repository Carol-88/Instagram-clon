import { useState } from "react";
import { useEffect } from "react";

export const useDateTime = (interval = 1000) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const tempId = setInterval(() => setCurrentDate(new Date()), interval);

		return () => clearInterval(tempId);
	}, [interval]);

	return currentDate;
};
