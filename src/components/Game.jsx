import React from "react";
import { useState, useEffect } from "react";
import Board from "./Board";

const Game = ({
	config: {
		height,
		width,
		mineCount: argMineCount,
		lives: argLives,
		onWin,
		onLose,
		autoSolveMode,
		noGuessMode,
		winStateCheck,
		startZone,
	},
}) => {
	const [lives, setLives] = useState(argLives || 3);
	const [mineCount, setMineCount] = useState(argMineCount || 10);

	const createBoard = (height, width) => {
		// console.log(height, ", ", width);
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
			onLose();
			setBoard(
				board.map((row) =>
					row.map((cell) => {
						if (cell.isMine && !cell.isFlagged) {
							return {
								...cell,
								isRevealed: true,
							};
						}
						return cell;
					})
				)
			);
		}
	}, [lives]);

	const checkWin = () => {
		const checkCellBothWays = (cell) => {
			return (
				(cell.isRevealed && !cell.isFlagged) ||
				(cell.isFlagged && cell.isMine)
			);
		};
		const checkCellRevealed = (cell) => {
			return cell.isRevealed || cell.isMine;
		};
		const checkCellFlagged = (cell) => {
			return (
				(cell.isFlagged && cell.isMine) ||
				(!cell.isFlagged && !cell.isMine)
			);
		};
		let checkCell;
		switch (winStateCheck) {
			case "revealAll":
				checkCell = checkCellRevealed;
				break;
			case "flagAll":
				checkCell = checkCellFlagged;
				break;
			case "both":
				checkCell = checkCellBothWays;
				break;

			default:
				break;
		}

		return board.every((row) => row.every(checkCell)) && lives > 0;
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
			// console.warn("argBoard is undefined");
		}
		if (x < 0 || y < 0 || x >= height || y >= width) {
			// console.warn("out of bounds");
			return hist;
		}

		//Check if the coords are in the hist
		if (hist.find((coord) => coord[0] === x && coord[1] === y)) {
			// console.warn("already checked");
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
			// console.log("Mine at " + x + ", " + y);
			setMineCount(mineCount - 1);
			setLives(lives - 1);
			hist.push([x, y]);
			return hist;
		}

		hist.push([x, y]);
		if (argBoard[x][y].content === 0) {
			// console.log("Zero at " + x + ", " + y);
			revealAdjacent(x, y, hist, argBoard);
		}

		// console.log("Unzero at " + x + ", " + y);
		return hist;
	};

	const chord = (x, y) => {
		const toChord = isCellComplete(x, y)
			? revealAdjacent(x, y, [[x, y]])
			: [[x, y]];
		// console.log(toChord);
		return batchReveal(toChord);
	};

	const isCellDetermined = (x, y) => {
		const count = board[x][y].content - countAdjacentFlags(x, y);

		// console.log(board);
		if (count === 0) {
			// console.log("Count zero at " + x + ", " + y);
			return false;
		}
		let countEmpty = 0;
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
					!board[x + i][y + j].isRevealed &&
					!board[x + i][y + j].isFlagged
				) {
					countEmpty++;
				}
			}
		}
		// console.log("countEmpty: " + countEmpty);
		// console.log("count: " + count);
		return count === countEmpty;
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
			if (newBoard[x][y].isFlagged) {
				setMineCount(mineCount );
				newBoard[x][y].isFlagged = false;
			}
			newBoard[x][y].isRevealed = true;

			// if (board[x][y].isMine === true) {
			// 	setMineCount(mineCount - 1);
			// 	setLives(lives - 1);
			// }
		});
		return newBoard;
	};

	const firstClick = (x, y) => {
		// console.log("First click");
		setFirstClick(false);

		const newBoard = fillBoard(x, y, startZone);

		if (autoSolveMode) {
			setTimeout(() => {
				solveBoard(newBoard);
			}, 500);
		}

		return newBoard;
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

	const fillBoard = (x, y, startZone) => {
		// console.log("Filling");
		const mineList = getMineCoords(
			mineCount - countMines(),
			[x, y],
			startZone
		);
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

		return newBoard;
	};

	const addMines = (coords) => {
		if (coords.length < 1) {
			return;
		}
		// console.log("ADD MINE");

		const newBoard = board.map((row) => row.map((cell) => cell));

		coords.forEach(([x, y]) => (newBoard[x][y].isMine = true));

		setBoard(newBoard);
	};

	const getStartingZone = ([x, y], size) => {
		const startZoneList = [];
		const basePosition = [
			x - Math.floor(size / 2),
			y - Math.floor(size / 2),
		];
		console.log([x, y], basePosition);
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				if (
					basePosition[0] + i < 0 ||
					basePosition[1] + j < 0 ||
					basePosition[0] + i >= height ||
					basePosition[1] + j >= width
				) {
					continue;
				}
				startZoneList.push([basePosition[0] + i, basePosition[1] + j]);
			}
		}
		return startZoneList;
	};

	const getMineCoords = (amount, origin, startZone) => {
		if (amount < 1) {
			return [];
		}
		const startZoneList = getStartingZone(origin, startZone);
		console.log(startZoneList);
		const mineArray = [];
		while (mineArray.length < amount) {
			const x = Math.floor(Math.random() * height);
			const y = Math.floor(Math.random() * width);

			if (
				board[x][y].isMine === undefined &&
				!startZoneList.find(([i, j]) => i === x && j === y) &&
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
	const countAdjacentFlags = (x, y) => {
		let count = 0;
		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				if (i >= 0 && j >= 0 && i < height && j < width) {
					if (board[i][j].isFlagged) {
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
		setMineCount(mineCount - 1);
		return board.map((r, i) =>
			r.map((c, j) => {
				if (x === i && y === j) {
					return { ...c, isFlagged: true };
				}
				return c;
			})
		);
	};

	const unflag = (x, y) => {
		setMineCount(mineCount + 1);
		return board.map((r, i) =>
			r.map((c, j) => {
				if (x === i && y === j) {
					return { ...c, isFlagged: false };
				}
				return c;
			})
		);
	};

	const findIn2d = (array, check) => {
		let found = { row: -1, column: -1 };

		array.some((row, rowIndex) => {
			const columnIndex = row.findIndex((item, columnIndex) => {
				// console.log("Checking ", rowIndex, columnIndex);
				return check(item, rowIndex, columnIndex);
			});
			if (columnIndex !== -1) {
				console.log("Found ", rowIndex, columnIndex);
				found.row = rowIndex;
				found.column = columnIndex;
				return true; // Stop iteration once item is found
			}
			return false;
		});

		if (found.row !== -1 && found.column !== -1) {
			return found;
		} else {
			return null;
		}
	};

	const flagSurrounding = (x, y) => {
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
					!board[x + i][y + j].isRevealed &&
					!board[x + i][y + j].isFlagged
				) {
					flag(x + i, y + j);
				}
			}
		}
	};

	const solveRound = (board) => {
		console.log(board);
		// console.log(
		// 	board.map((r, x) => r.map((c, y) => isCellDetermined(x, y)))
		// );
		console.log(findIn2d(board, (c, x, y) => isCellComplete(x, y)));
		console.log(findIn2d(board, (c, x, y) => isCellDetermined(x, y)));
		const nextComplete = findIn2d(board, (c, x, y) => isCellComplete(x, y));
		const nextDetermined = findIn2d(board, (c, x, y) =>
			isCellDetermined(x, y)
		);

		if (nextComplete) {
			chord(nextComplete.row, nextComplete.column);
		}

		if (nextDetermined) {
			flagSurrounding(nextDetermined.row, nextDetermined.column);
		}
	};

	const countRevealed = () => {
		let count = 0;
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell.isRevealed || cell.isFlagged) {
					count++;
				}
			});
		});
		return count;
	};

	const solveBoard = (board) => {
		console.log("solving board");
		// Function to update state with delay recursively
		const updateBoardRecursively = (board) => {
			// console.log("Inside recursive")
			if (countRevealed() < height * width) {
				// console.log("Recursive is checked")
				setTimeout(() => {
					const newBoard = solveRound(board);
					updateBoardRecursively(newBoard); // Call recursively with incremented value
				}, 500); // Delay of 1000 milliseconds (1 second)
			}
		};

		updateBoardRecursively(board); // Start the recursive update
	};

	const onRightClick = (e, i, j, cell) => {
		e.preventDefault();

		//Automated behavior
		if (autoSolveMode) {
			return;
		}

		//Normal behavior
		const newBoard = cell.isRevealed
			? board
			: cell.isFlagged
			? unflag(i, j)
			: flag(i, j);
		if (mineCount <= 0 && checkWin() && lives > 0) {
			onWin();
		}
		setBoard(newBoard);
	};

	const onLeftClick = (i, j, cell) => {
		// console.log("Left click");
		let newBoard;

		newBoard = isFirstClick
			? firstClick(i, j)
			: autoSolveMode
			? board
			: cell.isRevealed
			? chord(i, j)
			: cell.isFlagged
			? unflag(i, j)
			: batchReveal(getRevealList(i, j));

		setBoard(newBoard);

		if (mineCount <= 0 && checkWin() && lives > 0) {
			onWin();
		}
	};

	return (
		<>
			<Board
				board={board}
				onLeftClick={onLeftClick}
				onRightClick={onRightClick}
			/>
			<h2 className="stats">
				<span>🚩: {mineCount}</span>{" "}
				<span>
					{new Array(argLives)
						.fill("🖤")
						.map((v, i) => (i < lives ? "❤️" : v))
						.join("")}
				</span>
			</h2>
		</>
	);
};

export default Game;
