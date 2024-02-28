import React from "react";
import { useState, useEffect } from "react";
import minesweeper from "../minesweeper";
import Board from "./Board";

const Game = () => {
	const [lives, setLives] = useState(3);
	const [mineCount, setMineCount] = useState(3);
	const [m, setM] = useState(
		new minesweeper({
			height: 3,
			width: 3,
			mineCount: mineCount,
			lives: lives,
		})
	);

	const [board, setBoard] = useState(m.board);

	useEffect(() => {
		setLives(m.lives);
		if (lives <= 0) {
			alert("Game over");
		}
	}, [m.lives]);

	useEffect(() => {
		setMineCount(m.mineCount);
		if (mineCount <= 0 && m.checkWin() && lives > 0) {
			alert("You won!");
		}
	}, [m.mineCount]);

	const updateBoard = () => {
		setBoard(m.board.map((row) => row.map((cell) => cell)));
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

	const onRightClick = (e, cell) => {
		e.preventDefault();
		const f = cell.isRevealed
			? () => {}
			: cell.isFlagged
			? () => unflag(i, j)
			: () => flag(i, j);

		f();
	};

	const onLeftClick = (i, j) => {
		cell.isFlagged ? () => unflag(i, j) : () => reveal(i, j);
	};

	const getContent = (cell) => {
		!cell.isRevealed
			? cell.isFlagged
				? "🚩"
				: " "
			: cell.isMine
			? "💣"
			: cell.content == "0"
			? " "
			: cell.content;
	};

	return (
		<>
			<Board
				board={board}
				lives={lives}
				mineCount={mineCount}
				onLeftClick={onLeftClick}
				onRightClick={onRightClick}
				getContent={getContent}
			/>
		</>
	);
};

export default Game;
