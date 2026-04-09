import GameHandler from "./GameHandler";
import ConfigSelector from "./ConfigSelector";
import { useState, useEffect } from "react";
import "./Game.css";

function Game() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [key, setKey] = useState(0);
	const [lastTime, setLastTime] = useState(0);

	useEffect(() => {
		console.log(lastTime);
	}, [lastTime]);

	const onLose = (t) => {
		setIsGameOver(true);
		setDidWin(false);
		setLastTime(t);
	};
	const onWin = (t) => {
		setIsGameOver(true);
		setDidWin(true);
		setLastTime(t);
	};
	const [config, setConfig] = useState({});

	const handleRestart = () => {
		setKey(key + 1);
		setIsGameOver(false);
	};

	const handleBackToMenu = () => {
		setIsGameStarted(false);
		setIsGameOver(false);
	};

	return (
		<div className="App">
			{isGameStarted ? null : (
				<ConfigSelector
					setConfig={(config) => {
						// console.log(config);
						setConfig({
							...{
								height: 16,
								width: 30,
								mineCount: 99,
								lives: 3,
								onLose,
								onWin,
							},
							...config,
						});
					}}
					setIsGameStarted={setIsGameStarted}
				/>
			)}
			{isGameOver && <div className="gameover">

                <h1>{didWin ? "You Win !" : "You Lose !"}</h1>
                {didWin && <h2>{lastTime}</h2>}
            </div>
            }
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
