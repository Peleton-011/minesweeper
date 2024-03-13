import Game from "./components/Game";
import ConfigSelector from "./components/ConfigSelector";
import { useState } from "react";
import "./App.css";

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [didWin, setDidWin] = useState(false);

	const onLose = () => {
		setIsGameOver(true);
	};
	const onWin = () => {
		setIsGameOver(true);
		setDidWin(true);
	};

	const config = {
		height: 16,
		width: 30,
		mineCount: 99,
		lives: 3,
		onLose,
		onWin,
	};
	return (
		<div className="App">
            <ConfigSelector />
			<h1>{isGameOver ? (didWin ? "You Win !" : "You Lose !") : " "}</h1>
			<Game config={config} />
		</div>
	);
}

export default App;
