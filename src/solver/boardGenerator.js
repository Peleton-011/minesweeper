const getRecommendedMines = (height, width) => {
	return Math.floor((309 / 2080 + (height * width) / 8320) * width * height);
};

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

const fillBoard = ({ x, y, startZone, mineCount, board }) => {
	// console.log("Filling");
	const mineList = getMineCoords({
		amount: mineCount - countMines({ board }),
		origin: [x, y],
		startZone,
		board,
	});
	addMines({ coords: mineList, board });

	board.forEach((row, i) => {
        board[i].forEach((cell, j) => {
			const newCell = {
				...cell,
				content: countAdjacentMines({x: i, y: j, board}),
			};

			if (cell.isMine === undefined) {
				newCell.isMine = false;
			}
            board[i][j] = newCell;
		});
	});

	const initialZone = getRevealList({ x, y, hist: [], board });

	// console.log(initialZone);

	initialZone.forEach(([x, y]) => {
		board[x][y].isRevealed = true;
	});

	return board;
};

const getMineCoords = ({ amount, origin, startZone, board }) => {
	const height = board.length;
	const width = board[0].length;

	if (amount < 1) {
		return [];
	}
	const startZoneList = getStartingZone({ origin, startZone, height, width });
	const mineArray = [];
	while (mineArray.length < amount) {
		const x = Math.floor(Math.random() * height);
		const y = Math.floor(Math.random() * width);

		if (
			board[x][y].isMine === undefined &&
			!startZoneList.find(([i, j]) => i === x && j === y) &&
			!mineArray.find(([i, j]) => i === x && j === y)
		) {
			mineArray.push([x, y]);
		}
	}
	return mineArray;
};

const getStartingZone = ({
	origin: [x, y],
	startZone: size,
	height,
	width,
}) => {
	const startZoneList = [];
	const basePosition = [x - Math.floor(size / 2), y - Math.floor(size / 2)];
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

const countMines = ({ board }) => {
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

const addMines = ({ coords, board }) => {
	if (coords.length < 1) {
		return;
	}

	coords.forEach(([x, y]) => (board[x][y].isMine = true));
};

const countAdjacentMines = ({ x, y, board }) => {
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

const getRevealList = ({ x, y, hist = [], board }) => {
	const height = board.length;
	const width = board[0].length;

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
		board[x][y].isRevealed ||
		(board[x][y].isFlagged && board[x][y].isMine)
	) {
		// console.warn("already revealed");
		return hist;
	}

	if (board[x][y].isMine) {
		hist.push([x, y]);
		return hist;
	}

	hist.push([x, y]);
	if (board[x][y].content === 0) {
		// console.log("Zero at " + x + ", " + y);
		revealAdjacent(x, y, hist, board);
	}

	// console.log("Unzero at " + x + ", " + y);
	return hist;
};

const revealAdjacent = (x, y, hist, board) => {
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
            getRevealList({x: x + i, y: y + j, hist, board});
        }
    }
    return hist;
};

export const boardGenerator = ({
	height = 16,
	width = height,
	mineCount = getRecommendedMines(height, width),
	lives = 3,
	startZone = 5,
	startX = width / 2,
	startY = height / 2,
}) => {
	const board = createBoard(height, width);

	return fillBoard({ x: startX, y: startY, startZone, mineCount, board });
};
