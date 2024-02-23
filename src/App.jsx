import { useState } from "react";
import minesweeper from "./minesweeper";
import Board from "./components/Board";
import "./App.css";

function App() {
	const m = new minesweeper({ height: 3, width: 3, mineCount: 3 });
	const [isFirstClick, setFirstClick] = useState(true);
	const onClick = (x, y) => {
		if (isFirstClick) {
			m.firstClick(x, y);
			setFirstClick(false);
		} else {
			m.reveal(x, y);
		}
	};
	return (
		<>
			<Board board={m.board} click={onClick} />
		</>
	);
}

export default App;
