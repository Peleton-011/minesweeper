class minesweeper {





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
