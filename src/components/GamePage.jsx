import GameHandler from "@/components/GameHandler";
import { useState, useEffect, useRef } from "react";
import "@/components/Game.css";
import { getPlayTimeString } from "@/utils/timeutils";
import { addScore, fetchScores } from "@/utils/leaderboard";
import { useParams, Link } from "react-router-dom";

function Game() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);
	const [key, setKey] = useState(0);
	const [lastTime, setLastTime] = useState(0);

	const {
		width,
		height,
		mines,
		lives,
		noGuessMode = false,
		autoSolveMode = false,
		winStateCheck = "revealAll",
		startZone = 3,
	} = useParams();

	const onLose = (t) => {
		setIsGameOver(true);
		setDidWin(false);
		setLastTime(t);
	};
	const onWin = (t) => {
		setIsGameOver(true);
		setDidWin(true);
		setLastTime(t);
		// console.log(configRef.current);
		addScore(t, config);
	};

	const config = {
		size: Number(width) * Number(height),
		width: Number(width),
		height: Number(height),
		mineCount: Number(mines),
		lives: Number(lives),
		noGuessMode: noGuessMode === "true",
		autoSolveMode: autoSolveMode === "true",
		winStateCheck: winStateCheck,
		startZone: Number(startZone),
		onLose,
		onWin,
	};

	const handleRestart = () => {
		setKey(key + 1);
		setIsGameOver(false);
	};

	return (
		<div className="App">
			{isGameOver && (
				<div className="gameover">
					<h1>{didWin ? "You Win !" : "You Lose !"}</h1>
					{didWin && <h2>{getPlayTimeString(lastTime)}</h2>}
				</div>
			)}
			<GameHandler config={config} key={key} isGameOver={isGameOver} />

			{isGameOver && (
				<div className="game-over-buttons">
					<button onClick={handleRestart}>Play Again</button>
					<Link className="button" to={`/${width}/${height}/${mines}/${lives}`}>
						Back to Menu
					</Link>
				</div>
			)}
		</div>
	);
}

export default Game;
