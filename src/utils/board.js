export const createBoard = (height, width) => {
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

export const checkWin = (board, winStateCheck, lives) => {
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
			(cell.isFlagged && cell.isMine) || (!cell.isFlagged && !cell.isMine)
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

export const fillBoard = (x, y, startZone, board, mineCount) => {
	// console.log("Filling");
	const mineList = getMineCoords(
		mineCount - countMines(board),
		[x, y],
		startZone,
		board,
	);
	board = addMines(mineList, board);

	const newBoard = board.map((row, i) => {
		return row.map((cell, j) => {
			const newCell = {
				...cell,
				content: countAdjacentMines(i, j, board),
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

const addMines = (coords, board) => {
	if (coords.length < 1) {
		return;
	}
	// console.log("ADD MINE");

	const newBoard = board.map((row) => row.map((cell) => cell));

	coords.forEach(([x, y]) => (newBoard[x][y].isMine = true));

	return newBoard;
};

const getMineCoords = (amount, origin, startZone, board) => {
	if (amount < 1) {
		return [];
	}
	const height = board.length;
	const width = board[0].length;

	const startZoneList = getStartingZone(origin, startZone, height, width);
	// console.log(startZoneList);
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

const countAdjacentMines = (x, y, board) => {
	let count = 0;
	const height = board.length;
	const width = board[0].length;
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

const getStartingZone = ([x, y], size, height, width) => {
	const startZoneList = [];
	const basePosition = [x - Math.floor(size / 2), y - Math.floor(size / 2)];
	// console.log([x, y], basePosition);
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

const countMines = (board) => {
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

//------------------------------------

export const getRevealList = (x, y, hist = [], argBoard) => {
	const height = argBoard.length;
	const width = argBoard[0].length;
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

export const revealAdjacent = (x, y, hist, board) => {
	const height = board.length;
	const width = board[0].length;

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i === 0 && j === 0) {
				continue;
			}
			if (x + i < 0 || y + j < 0 || x + i >= height || y + j >= width) {
				continue;
			}
			getRevealList(x + i, y + j, hist, board);
		}
	}
	return hist;
};
