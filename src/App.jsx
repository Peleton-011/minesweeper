import Game from "./components/Game";
import ConfigSelector from "./components/ConfigSelector";
import { useState, useEffect } from "react";
import "./App.css";
import { enable as enableDarkMode } from "darkreader";

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);

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

	return (
		<div className="App">
			{Object.keys(config).length ? null : (
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
				/>
			)}
			<h1>{isGameOver ? (didWin ? "You Win !" : "You Lose !") : " "}</h1>
			{Object.keys(config).length ? <Game config={config} /> : null}
		</div>
	);
}

export default App;
