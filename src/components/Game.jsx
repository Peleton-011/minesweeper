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
					isRevealed: true,
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
		const checkCell = (cell) => {
			if (!cell.isRevealed && !cell.isFlagged && cell.isMine) {
				return false;
			}

			if (cell.isFlagged && !cell.isMine) {
				return false;
			}

			return true;
		};
		return board.every((row) => row.every(checkCell));
	};

	const [isFirstClick, setFirstClick] = useState(true);
	const reveal = (x, y) => {
		if (x < 0 || y < 0 || x >= height || y >= width) {
			return;
		}

		if (board[x][y].isRevealed) {
			return;
		}

		setBoard(
			board.map((r, i) =>
				r.map((c, j) => {
					if (x === i && y === j) {
						return { ...c, isRevealed: true };
					}
					return c;
				})
			)
		);

		if (board[x][y].isMine) {
			setMineCount(mineCount - 1);
			setLives(lives - 1);
			return;
		}

		if (board[x][y].content === 0) {
			revealAdjacent(x, y);
		}
	};

	const firstClick = (x, y) => {
		console.log("First click");
		setFirstClick(false);

		fillBoard(x, y);
		reveal(x, y);
	};

	const revealAdjacent = (x, y) => {
		reveal(x - 1, y - 1);
		reveal(x - 1, y);
		reveal(x - 1, y + 1);
		reveal(x, y - 1);
		reveal(x, y + 1);
		reveal(x + 1, y - 1);
		reveal(x + 1, y);
		reveal(x + 1, y + 1);
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
		const mineList = getMineCoords(mineCount - countMines(), [x, y]);
		addMines(mineList);

		setBoard(
			board.map((row, i) => {
				return row.map((cell, j) => {
					if (cell.isMine === undefined) {
						return {
							...cell,
							content: countAdjacentMines(i, j),
							isMine: false,
						};
					}
					return {
						...cell,
						content: countAdjacentMines(i, j),
					};
				});
			})
		);
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
				!(Math.abs(x - origin[0]) < 3 && Math.abs(y - origin[1]) < 3) &&
				!mineArray.find(([i, j]) => i === x && j === y)
			) {
				console.log(origin, [x, y]);
				mineArray.push([x, y]);
			}
		}
		console.log(mineArray);
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
		if (this.board[x][y].isRevealed) {
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
		if (this.board[x][y].isRevealed) {
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
		cell.isFlagged
			? unflag(i, j)
			: isFirstClick
			? firstClick(i, j)
			: reveal(i, j);
	};

	const getContent = (cell) => {
		return !cell.isRevealed
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
			<button onClick={() => addMines([[0, 0]])}>Ass</button>
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
