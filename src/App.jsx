import { useState } from "react";
import minesweeper from "./minesweeper";
import Board from "./components/Board";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
    const m = new minesweeper({ height: 3, width: 3, mineCount: 3 });
	return (
		<>
			<Board
				board={m.board} click={(x, y) => m.firstClick(x, y)}
			/>
		</>
	);
}

export default App;
