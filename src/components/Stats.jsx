import { getTimeString } from "../utils/timeutils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Stats = ({
	start,
	accumulated,
	isFirstClick,
	isGameOver,
	lives,
	argLives,
	mineCount,
}) => {
	const [displayTime, setDisplayTime] = useState(0);

	useEffect(() => {
		if (isFirstClick || isGameOver) return;

		start.current = Date.now();

		const interval = setInterval(() => {
			if (start.current === null) return;
			setDisplayTime(accumulated.current + (Date.now() - start.current));
		}, 20);

		return () => {
			clearInterval(interval);
			if (start.current !== null) {
				accumulated.current += Date.now() - start.current;
				start.current = null;
			}
		};
	}, [isFirstClick, isGameOver]);

	return (
		<h2 className={"stats " + (isGameOver ? "game-over" : "")}>
			<Link className="button" to="/">{"<--"}</Link>
			<span className="middle">
				<span className="minecount">{mineCount} 🚩</span>{" "}
				<span className="playtime">
					{getTimeString(
						displayTime,
						// accumulated.current +
						// (start.current ? Date.now() - start.current : 0),
					)}
				</span>
			</span>
			<span className="lives">
				{new Array(argLives)
					.fill("🖤")
					.map((v, i) => (i < lives ? "❤️" : v))
					.join("")}
			</span>
		</h2>
	);
};

export default Stats;
