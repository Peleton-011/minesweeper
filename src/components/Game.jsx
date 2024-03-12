import React from "react";
import { useState, useEffect } from "react";
import minesweeper from "../minesweeper";
import Board from "./Board";

const Game = ({
	height: argHeight,
	width: argWidth,
	mineCount: argMineCount,
	lives: argLives,
}) => {
	const ms = new minesweeper();
	const [lives, setLives] = useState(argLives || 3);
	const [mineCount, setMineCount] = useState(argMineCount || 10);

	const height = argHeight || 10;
	const width = argWidth || 10;

	const [board, setBoard] = useState(ms.createBoard(height, width));

	useEffect(() => {
		if (lives <= 0) {
			alert("Game over");
		}
	}, [lives]);

	useEffect(() => {
		if (mineCount <= 0 && ms.checkWin(board) && lives > 0) {
			alert("You won!");
		}
	}, [mineCount]);

	const [isFirstClick, setFirstClick] = useState(true);

	const chord = (x, y) => {
		if (!isCellComplete(x, y)) {
			return [];
		}
		return ms.revealAdjacent(x, y, [[x, y]]);
	};

	const isCellComplete = (x, y) => {
		const count = board[x][y].content;
		if (count === 0) {
			// console.log("Count zero at " + x + ", " + y);
			return false;
		}
		let countFlagged = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) {
					continue;
				}
				if (
					x + i < 0 ||
					y + j < 0 ||
					x + i >= height ||
					y + j >= width
				) {
					continue;
				}
				if (
					board[x + i][y + j].isFlagged ||
					(board[x + i][y + j].isRevealed &&
						board[x + i][y + j].isMine)
				) {
					countFlagged++;
				}
			}
		}

		return count === countFlagged;
	};

	const batchReveal = (list) => {
		const newBoard = board.map((row) => row.map((cell) => cell));

		list.forEach(([x, y]) => {
			newBoard[x][y].isRevealed = true;
			// if (board[x][y].isMine === true) {
			// 	setMineCount(mineCount - 1);
			// 	setLives(lives - 1);
			// }
		});
		setBoard(newBoard);
	};

	const firstClick = (x, y) => {
		setFirstClick(false);

		setBoard(ms.fillBoard(x, y, board, mineCount));
	};

	const flag = (x, y) => {
		if (board[x][y].isRevealed) {
			return;
		}
		setBoard(
			board.map((r, i) =>
				r.map((c, j) => {
					if (x === i && y === j) {
						return { ...c, isFlagged: true };
					}
					return c;
				})
			)
		);
		setMineCount(mineCount - 1);
	};

	const unflag = (x, y) => {
		if (board[x][y].isRevealed) {
			return;
		}
		setBoard(
			board.map((r, i) =>
				r.map((c, j) => {
					if (x === i && y === j) {
						return { ...c, isFlagged: false };
					}
					return c;
				})
			)
		);
		setMineCount(mineCount + 1);
	};

	const onRightClick = (e, i, j, cell) => {
		e.preventDefault();
		const f = cell.isRevealed
			? () => {}
			: cell.isFlagged
			? () => unflag(i, j)
			: () => flag(i, j);

		f();
	};

	const onLeftClick = (i, j, cell) => {
		console.log("Left click");
		cell.isRevealed
			? batchReveal(chord(i, j))
			: cell.isFlagged
			? unflag(i, j)
			: isFirstClick
			? firstClick(i, j)
			: batchReveal(ms.getRevealList(i, j, board));
	};

	return (
		<>
			<button onClick={() => addMines([[0, 0]])}>Ass</button>
			<Board
				board={board}
				lives={lives}
				mineCount={mineCount}
				onLeftClick={onLeftClick}
				onRightClick={onRightClick}
			/>
		</>
	);
};

export default Game;
