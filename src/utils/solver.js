const countRevealed = (board) => {
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

export const solveBoard = (board) => {
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

const solveRound = (board) => {
	console.log(board);
	// console.log(
	// 	board.map((r, x) => r.map((c, y) => isCellDetermined(x, y)))
	// );
	console.log(findIn2d(board, (c, x, y) => isCellComplete(x, y)));
	console.log(findIn2d(board, (c, x, y) => isCellDetermined(x, y)));
	const nextComplete = findIn2d(board, (c, x, y) => isCellComplete(x, y));
	const nextDetermined = findIn2d(board, (c, x, y) => isCellDetermined(x, y));

	if (nextComplete) {
		chord(nextComplete.row, nextComplete.column);
	}

	if (nextDetermined) {
		flagSurrounding(nextDetermined.row, nextDetermined.column);
	}
};

const flagSurrounding = (x, y) => {
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i === 0 && j === 0) {
				continue;
			}
			if (x + i < 0 || y + j < 0 || x + i >= height || y + j >= width) {
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
			if (x + i < 0 || y + j < 0 || x + i >= height || y + j >= width) {
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
