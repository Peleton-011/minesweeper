import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";

const Game = ({
	height: argHeight,
	width: argWidth,
	mineCount: argMineCount,
	lives: argLives,
}) => {
	const [lives, setLives] = useState(argLives || 3);
	const [mineCount, setMineCount] = useState(argMineCount || 10);

	const height = argHeight || 10;
	const width = argWidth || 10;

	const createBoard = (height, width) => {
		const board = [];
		for (let i = 0; i < height; i++) {
			const row = [];
			for (let j = 0; j < width; j++) {
				row.push({
					isMine: undefined,
					isRevealed: false,
					isFlagged: false,
					content: undefined,
				});
			}
			board.push(row);
		}
		return board;
	};

	const [board, setBoard] = useState(createBoard(height, width));

	useEffect(() => {
		if (lives <= 0) {
			alert("Game over");
		}
	}, [lives]);

	useEffect(() => {
		if (mineCount <= 0 && checkWin() && lives > 0) {
			alert("You won!");
		}
	}, [mineCount]);

	// useEffect(() => {
	// 	console.log("state");
	// 	fillBoard();
	// 	console.log(board);
	// }, []);

	const checkWin = () => {
		const checkCellBothWays = (cell) => {
			if (!cell.isRevealed && !cell.isFlagged && cell.isMine) {
				return false;
			}

			if (cell.isFlagged && !cell.isMine) {
				return false;
			}

			return true;
		};
		const checkCellRevealed = (cell) => {
			return cell.isRevealed || cell.isMine;
		};
		return board.every((row) => row.every(checkCellRevealed)) && lives > 0;
	};

	const [isFirstClick, setFirstClick] = useState(true);

	const revealAdjacent = (x, y, hist, board) => {
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
				getRevealList(x + i, y + j, hist, board);
			}
		}
		return hist;
	};

	const getRevealList = (x, y, hist = [], argBoard) => {
		if (argBoard === undefined) {
			argBoard = board;
			console.warn("argBoard is undefined");
		}
		if (x < 0 || y < 0 || x >= height || y >= width) {
			console.warn("out of bounds");
			return hist;
		}

		//Check if the coords are in the hist
		if (hist.find((coord) => coord[0] === x && coord[1] === y)) {
			console.warn("already checked");
			return hist;
		}

		if (
			argBoard[x][y].isRevealed ||
			(argBoard[x][y].isFlagged && argBoard[x][y].isMine)
		) {
			// console.warn("already revealed");
			return hist;
		}

		if (argBoard[x][y].isMine) {
			console.log("Mine at " + x + ", " + y);
			setMineCount(mineCount - 1);
			setLives(lives - 1);
			hist.push([x, y]);
			return hist;
		}

		hist.push([x, y]);
		if (argBoard[x][y].content === 0) {
			console.log("Zero at " + x + ", " + y);
			revealAdjacent(x, y, hist, argBoard);
		}

		// console.log("Unzero at " + x + ", " + y);
		return hist;
	};

	const chord = (x, y) => {
		if (!isCellComplete(x, y)) {
			return;
		}
		console.log("complete");
		const toChord = revealAdjacent(x, y, [[x, y]]);
		console.log(toChord);
		batchReveal(toChord);
	};

	const isCellComplete = (x, y) => {
		const count = board[x][y].content;
		if (count === 0) {
			console.log("Count zero at " + x + ", " + y);
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
		console.log("First click");
		setFirstClick(false);

		fillBoard(x, y);
	};

	const countMines = () => {
		let count = 0;
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.isMine) {
					count++;
				}
			});
		});
		return count;
	};

	const fillBoard = (x, y) => {
		// console.log("Filling");
		const mineList = getMineCoords(mineCount - countMines(), [x, y]);
		addMines(mineList);

		const newBoard = board.map((row, i) => {
			return row.map((cell, j) => {
				const newCell = {
					...cell,
					content: countAdjacentMines(i, j),
				};

				if (cell.isMine === undefined) {
					newCell.isMine = false;
				}
				return newCell;
			});
		});

		const initialZone = getRevealList(x, y, [], newBoard);

		// console.log(initialZone);

		initialZone.forEach(([x, y]) => {
			newBoard[x][y].isRevealed = true;
		});

		setBoard(newBoard);
	};

	const addMines = (coords) => {
		if (coords.length < 1) {
			return;
		}
		console.log("ADD MINE");

		const newBoard = board.map((row) => row.map((cell) => cell));

		coords.forEach(([x, y]) => (newBoard[x][y].isMine = true));

		setBoard(newBoard);
	};

	const getMineCoords = (amount, origin) => {
		if (amount < 1) {
			return [];
		}
		const mineArray = [];
		while (mineArray.length < amount) {
			const x = Math.floor(Math.random() * height);
			const y = Math.floor(Math.random() * width);

			if (
				board[x][y].isMine === undefined &&
				!(Math.abs(x - origin[0]) < 2 && Math.abs(y - origin[1]) < 2) &&
				!mineArray.find(([i, j]) => i === x && j === y)
			) {
				// console.log(origin, [x, y]);
				mineArray.push([x, y]);
			}
		}
		// console.log(mineArray);
		return mineArray;
	};
	const countAdjacentMines = (x, y) => {
		let count = 0;
		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				if (i >= 0 && j >= 0 && i < height && j < width) {
					if (board[i][j].isMine) {
						count++;
					}
				}
			}
		}
		return count;
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
			? chord(i, j)
			: cell.isFlagged
			? unflag(i, j)
			: isFirstClick
			? firstClick(i, j)
			: batchReveal(getRevealList(i, j));
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
