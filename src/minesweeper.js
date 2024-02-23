class minesweeper {
	constructor({ height, width, mineCount }) {
		this.height = height;
		this.width = width;
		this.mineCount = mineCount;
		this.board = this.createBoard();
	}

	createBoard() {
		const board = [];
		for (let i = 0; i < this.height; i++) {
			const row = [];
			for (let j = 0; j < this.width; j++) {
				row.push({
					isMine: undefined,
					isRevealed: false,
					isFlagged: undefined,
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
	}

	addMine(x, y) {
		this.board[x][y].isMine = true;
	}

	reveal(x, y) {
		if (x < 0 || y < 0 || x >= this.height || y >= this.width) {
			return;
		}

		if (this.board[x][y].isRevealed) {
			return;
		}

		console.log("Revealing " + x + ", " + y);

		this.board[x][y].isRevealed = true;

		if (this.board[x][y].isMine) {
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
		this.board[x][y].isFlagged = true;
	}
}

export default minesweeper;
