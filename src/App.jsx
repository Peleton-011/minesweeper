import Game from "./components/Game";
import ConfigSelector from "./components/ConfigSelector";
import { useState, useEffect } from "react";
import "./App.css";
import { enable as enableDarkMode } from "darkreader";

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [key, setKey] = useState(0);

	useEffect(() => {
		enableDarkMode({
			brightness: 100,
			contrast: 100,
		});
	}, []);

	const onLose = () => {
		setIsGameOver(true);
	};
	const onWin = () => {
		setIsGameOver(true);
		setDidWin(true);
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
						console.log(config);
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
			{isGameOver && <h1>{didWin ? "You Win !" : "You Lose !"}</h1>}
			{isGameStarted ? (
				<Game config={config} key={key} isGameOver={isGameOver} />
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

export default App;
