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
					isMine: false,
					isRevealed: true,
					isFlagged: false,
					content: 7,
				});
			}
			board.push(row);
		}
		return board;
	}

	addMine(x, y) {
		this.board[x][y].isMine = true;
	}

	reveal(x, y) {
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
