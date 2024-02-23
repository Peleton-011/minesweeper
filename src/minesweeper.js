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


}

export default minesweeper;
