class minesweeper {
	createBoard = (height, width) => {
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

	checkWin = (board) => {
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

	revealAdjacent = (x, y, hist, board) => {
		const height = board.length;
		const width = board[0].length;

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
				this.getRevealList(x + i, y + j, hist, board);
			}
		}
		return hist;
	};

	getRevealList = (x, y, hist = [], board) => {
		console.log(board);
		const height = board.length;
		const width = board[0].length;

		//Check if the coords are in the board
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
			board[x][y].isRevealed ||
			(board[x][y].isFlagged && board[x][y].isMine)
		) {
			// console.warn("already revealed");
			return hist;
		}

		if (board[x][y].isMine) {
			console.log("Mine at " + x + ", " + y);
			setMineCount(mineCount - 1);
			setLives(lives - 1);
			hist.push([x, y]);
			return hist;
		}

		hist.push([x, y]);
		if (board[x][y].content === 0) {
			console.log("Zero at " + x + ", " + y);
			this.revealAdjacent(x, y, hist, board);
		}

		// console.log("Unzero at " + x + ", " + y);
		return hist;
	};

	countMines = (board) => {
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

	fillBoard = (x, y, board, mineCount) => {
		// console.log("Filling");
		const mineList = this.getMineCoords(
			mineCount - this.countMines(board),
			[x, y],
			board
		);

		const newBoard = board.map((row, i) => {
			return row.map((cell, j) => ({
				...cell,
				content: this.countAdjacentMines(i, j, board),
				isMine: mineList.find(([x, y]) => x === i && y === j),
			}));
		});

		const initialZone = this.getRevealList(x, y, [], newBoard);

		// console.log(initialZone);

		initialZone.forEach(([x, y]) => {
			newBoard[x][y].isRevealed = true;
		});

		return newBoard;
	};
	getMineCoords = (amount, origin, board) => {
		if (amount < 1) {
			return [];
		}
		const height = board.length;
		const width = board[0].length;

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
	countAdjacentMines = (x, y, board) => {
		const height = board.length;
		const width = board[0].length;

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
}

export default minesweeper;
