import { useState, useEffect } from "react";

const useDeviceType = () => {
	const [deviceType, setDeviceType] = useState(
		window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop"
	);

	useEffect(() => {
		const handleResize = () => {
			setDeviceType(
				window.matchMedia("(max-width: 768px)").matches
					? "mobile"
					: "desktop"
			);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return deviceType;
};

export default useDeviceType;
