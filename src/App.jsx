import { useState, useEffect } from "react";
import minesweeper from "./minesweeper";
import Board from "./components/Board";
import "./App.css";

function App() {
	const [lives, setLives] = useState(3);
    const [mineCount, setMineCount] = useState(3);
	const [m, setM] = useState(
		new minesweeper({
			height: 3,
			width: 3,
			mineCount: 3,
			lives: lives,
			setLives: setLives,
		})
	);

	const [board, setBoard] = useState(m.board);

    useEffect(() => {
        if (lives <= 0) {
            alert("Game over");
        }
    }, [lives]);

    useEffect(() => {
        if (mineCount <= 0 && m.checkWin()) {
            alert("You won!");
        }
    }, [mineCount]);

	const updateBoard = () => {
		console.log("Class board");
		console.log(m.board.map((row) => row.map((cell) => cell.isRevealed)));
		setBoard(m.board.map((row) => row.map((cell) => cell)));
		console.log("State board");
		console.log(board.map((row) => row.map((cell) => cell.isRevealed)));
	};

	const [isFirstClick, setFirstClick] = useState(true);
	const reveal = (x, y) => {
		if (isFirstClick) {
			m.firstClick(x, y);
			updateBoard();
			setFirstClick(false);
		} else {
			m.reveal(x, y);
			updateBoard();
		}
	};

    const flag = (x, y) => {
        console.log("flag", x, y);
        m.flag(x, y);
        setMineCount(mineCount - 1);
        updateBoard();
    };

    const unflag = (x, y) => {
        m.unflag(x, y);
        setMineCount(mineCount + 1);
        updateBoard();
    };

	return (
		<>
			<Board board={board} reveal={reveal} flag={flag} unflag={unflag} lives={lives} mineCount={mineCount} />
		</>
	);
}

export default App;
