import { useState } from "react";
import minesweeper from "./minesweeper";
import Board from "./components/Board";
import "./App.css";

function App() {
	const [m, setM] = useState(new minesweeper({ height: 9, width: 9, mineCount: 9 }));

	const [board, setBoard] = useState(m.board);

	const updateBoard = () => {
        console.log("Class board")
        console.log(m.board)
		setBoard(m.board);
        console.log("State board")
        console.log(board)
	};

	const [isFirstClick, setFirstClick] = useState(true);
	const onClick = (x, y) => {
		if (isFirstClick) {
            console.log ("first click")
			m.firstClick(x, y);
			updateBoard();
			setFirstClick(false);
		} else {
            console.log ("not first click")
			m.reveal(x, y);
			updateBoard();
		}
	};
	return (
		<>
			<Board board={board} click={onClick} />
		</>
	);
}

export default App;
