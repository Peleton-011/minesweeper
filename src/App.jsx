import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

const height = 9;
const width = 9;
const mineCount = 9;

function App() {
	const [board, setBoard] = useState(m.board);

	const updateBoard = () => {
		console.log("Class board");
		console.log(m.board);
		setBoard(m.board);
		console.log("State board");
		console.log(board);
	};

	const [isFirstClick, setFirstClick] = useState(true);
	const onClick = (x, y) => {
		if (isFirstClick) {
			console.log("first click");
			m.firstClick(x, y);
			updateBoard();
			setFirstClick(false);
		} else {
			console.log("not first click");
			m.reveal(x, y);
			updateBoard();
		}
	};

	const firstClick = (x, y) => {
		console.log("first click", x, ", ", y);
		setBoard((board) =>
			board.map((row, i) =>
				row.map((cell, j) => {
					if ( j === y) {
						return {
							...cell,
							isMine: false,
						};
					}
				})
			)
		);
		fillBoard();
		reveal(x, y);
	};

	return (
		<>
			<Board board={board} click={onClick} />
		</>
	);
}

function createBoard() {
	const board = [];
	for (let i = 0; i < height; i++) {
		const row = [];
		for (let j = 0; j < width; j++) {
			row.push({
				isMine: undefined,
				isRevealed: true,
				isFlagged: false,
				content: undefined,
			});
		}
		board.push(row);
	}
	return board;
}

export default App;
