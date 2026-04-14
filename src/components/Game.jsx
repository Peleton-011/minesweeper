import GameHandler from "./GameHandler";
import ConfigSelector from "./ConfigSelector";
import { useState, useEffect, useRef } from "react";
import "./Game.css";
import { getPlayTimeString } from "../utils/timeutils";
import { addScore, fetchScores } from "../utils/leaderboard";
import { useParams } from "react-router-dom";

function Game() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [key, setKey] = useState(0);
	const [lastTime, setLastTime] = useState(0);

	const { width, height, mines, lives } = useParams();

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
		addScore(t, configRef.current);
	};

	const baseConfig = {
		height: 16,
		width: 30,
		mineCount: 99,
		lives: 3,
		onLose,
		onWin,
	};

	const [config, setConfig] = useState({});
	const configRef = useRef(config);

	useEffect(() => {
		configRef.current = config;
	}, [config]);

	const handleRestart = () => {
		setKey(key + 1);
		setIsGameOver(false);
	};

	const handleBackToMenu = () => {
		setIsGameStarted(false);
		setIsGameOver(false);
	};

	useEffect(() => {
		const initialConfig = {
			size: Number(width) * Number(height),
			width: Number(width),
			height: Number(height),
			mineCount: Number(mines),
			lives: Number(lives),
		};

		setConfig(initialConfig);
	}, []);

	return (
		<div className="App">
			{isGameStarted ? null : (
				<ConfigSelector
					setConfig={(config) => {
						// console.log(config);
						setConfig({
							...baseConfig,
							...config,
						});
					}}
					setIsGameStarted={setIsGameStarted}
					initialConfig={config}
				/>
			)}
			{isGameOver && (
				<div className="gameover">
					<h1>{didWin ? "You Win !" : "You Lose !"}</h1>
					{didWin && <h2>{getPlayTimeString(lastTime)}</h2>}
				</div>
			)}
			{isGameStarted ? (
				<GameHandler
					config={config}
					key={key}
					isGameOver={isGameOver}
				/>
			) : null}

			{isGameOver && (
				<div className="game-over-buttons">
					<button onClick={handleRestart}>Play Again</button>
					<button onClick={handleBackToMenu}>Back to Menu</button>
				</div>
			)}
		</div>
	);
}

export default Game;
