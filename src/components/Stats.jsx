import { getTimeString } from "../utils/timeutils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

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
			<Link className="button stealth-button flex flex-col" to="/">
				<ArrowLeft />
			</Link>
			<span className="middle">
				<span className="minecount">
					{mineCount} <span className="flag"></span>
				</span>{" "}
				<span className="playtime">
					{getTimeString(
						displayTime
						// accumulated.current +
						// (start.current ? Date.now() - start.current : 0),
					)}
				</span>
			</span>
			<span className="lives">
				{Array.from({ length: argLives }).map((_, i) => {
					return (
						<span
							key={i}
							className={
								(i < lives ? "full" : "empty") + "-heart"
							}
						></span>
					);
				})}
			</span>
		</h2>
	);
};

export default Stats;
