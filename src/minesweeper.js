class minesweeper {
	constructor({ height, width, mineCount, lives }) {
		this.height = height;
		this.width = width;
		this.mineCount = mineCount;
		this.board = this.createBoard();
		this.lives = lives;
		this.clickMine = () => {
			this.mineCount -= 1;
			this.lives -= 1;
		};
	}

	createBoard() {
		const board = [];
		for (let i = 0; i < this.height; i++) {
			const row = [];
			for (let j = 0; j < this.width; j++) {
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
	}

	firstClick(x, y) {
		console.log("first click", x, ", ", y);
		this.board[x][y].isMine = false;
		this.fillBoard();
		this.reveal(x, y);
	}

	fillBoard() {
		for (let i = 0; i < this.mineCount; i++) {
			const x = Math.floor(Math.random() * this.height);
			const y = Math.floor(Math.random() * this.width);
			if (this.board[x][y].isMine === undefined) {
				console.log("adding mine", x, ", ", y);
				this.addMine(x, y);
			} else {
				i--;
			}
		}

		this.board = this.board.map((row, i) =>
			row.map((cell, j) => ({
				...cell,
				content: this.countAdjacentMines(i, j),
				isMine: cell.isMine === undefined ? false : cell.isMine,
			}))
		);
	}

	countAdjacentMines(x, y) {
		let count = 0;
		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				if (i >= 0 && j >= 0 && i < this.height && j < this.width) {
					if (this.board[i][j].isMine) {
						count++;
					}
				}
			}
		}
		return count;
	}

	addMine(x, y) {
		this.board[x][y].isMine = true;
	}

	reveal(x, y) {
		if (x < 0 || y < 0 || x >= this.height || y >= this.width) {
			return;
		}

		if (this.board[x][y].isRevealed) {
			console.warn("Already revealed");
			return;
		}

		console.log("Revealing " + x + ", " + y);

		this.board[x][y].isRevealed = true;

		if (this.board[x][y].isMine) {
			this.clickMine();
			return;
		}

		if (this.board[x][y].content === 0) {
			this.revealAdjacent(x, y);
		}
	}

	revealAdjacent(x, y) {
		this.reveal(x - 1, y - 1);
		this.reveal(x - 1, y);
		this.reveal(x - 1, y + 1);
		this.reveal(x, y - 1);
		this.reveal(x, y + 1);
		this.reveal(x + 1, y - 1);
		this.reveal(x + 1, y);
		this.reveal(x + 1, y + 1);
	}

	flag(x, y) {
		if (this.board[x][y].isRevealed) {
			return;
		}
		this.mineCount -= 1;
		this.board[x][y].isFlagged = true;
	}

	unflag(x, y) {
		if (this.board[x][y].isRevealed) {
			return;
		}
		this.mineCount += 1;
		this.board[x][y].isFlagged = false;
	}

	checkWin() {
		const checkCell = (cell) => {
			if (!cell.isRevealed && !cell.isFlagged && cell.isMine) {
				return false;
			}

			if (cell.isFlagged && !cell.isMine) {
				return false;
			}

			return true;
		};
		return this.board.every((row) => row.every(checkCell));
	}
}

export default minesweeper;
