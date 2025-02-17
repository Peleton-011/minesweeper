/* Cells are: 
{
	isMine: boolean,
	isRevealed: boolean,
	isFlagged: boolean,
	content: number,
}
*/

export function getActiveNumberedCells(board) {
	const activeCells = [];
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			const cell = board[row][col];

			if (cell.isRevealed && !cell.isMine && cell.content > 0) {
				for (const [dx, dy] of directions) {
					const newRow = row + dx;
					const newCol = col + dy;

					if (
						newRow >= 0 &&
						newRow < board.length &&
						newCol >= 0 &&
						newCol < board[row].length
					) {
						const adjacentCell = board[newRow][newCol];
						if (
							!adjacentCell.isRevealed &&
							!adjacentCell.isFlagged
						) {
							activeCells.push({ row, col });
							break;
						}
					}
				}
			}
		}
	}

	return activeCells;
}

export function assignMatrixColumns(activeCells) {
	const columnMapping = new Map();
	let columnIndex = 0;
	activeCells.forEach(({ row, col }) => {
		columnMapping.set(`${row},${col}`, columnIndex++);
	});
	return columnMapping;
}

export function createMatrix(board, activeCells, columnMapping) {
	const matrix = [];
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	activeCells.forEach(({ row, col }) => {
		const rowVector = new Array(columnMapping.size).fill(0);
		const cell = board[row][col];

		directions.forEach(([dx, dy]) => {
			const newRow = row + dx;
			const newCol = col + dy;

			if (
				newRow >= 0 &&
				newRow < board.length &&
				newCol >= 0 &&
				newCol < board[row].length
			) {
				const adjacentCell = board[newRow][newCol];
				if (!adjacentCell.isRevealed && !adjacentCell.isFlagged) {
					const column = columnMapping.get(`${newRow},${newCol}`);
					if (column !== undefined) {
						rowVector[column] = 1;
					}
				}
			}
		});

		matrix.push(rowVector);
	});

	return matrix;
}

/* (No longer needed) implementation of exclusively the custom algorithm for solving the eliminated matrices
export function analyzeReducedMatrix(matrix) {
    const rowResults = [];

    for (let i = 0; i < matrix.length; i++) {
        let minBound = 0;
        let maxBound = 0;
        const row = matrix[i];
        const augmentedValue = row[row.length - 1];
        
        const positiveIndices = [];
        const negativeIndices = [];

        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] > 0) {
                maxBound += row[j];
                positiveIndices.push(j);
            } else if (row[j] < 0) {
                minBound += row[j];
                negativeIndices.push(j);
            }
        }

        if (augmentedValue === minBound) {
            negativeIndices.forEach(index => rowResults.push({ index, isMine: true }));
            positiveIndices.forEach(index => rowResults.push({ index, isMine: false }));
        } else if (augmentedValue === maxBound) {
            negativeIndices.forEach(index => rowResults.push({ index, isMine: false }));
            positiveIndices.forEach(index => rowResults.push({ index, isMine: true }));
        }
    }
    
    return rowResults;
}
    */

export function solveEliminatedMatrix(matrix) {
	const solution = new Map();

	for (let i = matrix.length - 1; i >= 0; i--) {
		let minBound = 0;
		let maxBound = 0;
		const row = matrix[i];
		const augmentedValue = row[row.length - 1];

		const positiveIndices = [];
		const negativeIndices = [];

		for (let j = 0; j < row.length - 1; j++) {
			if (row[j] > 0) {
				maxBound += row[j];
				positiveIndices.push(j);
			} else if (row[j] < 0) {
				minBound += row[j];
				negativeIndices.push(j);
			}
		}

		if (augmentedValue === minBound) {
			negativeIndices.forEach((index) => solution.set(index, true));
			positiveIndices.forEach((index) => solution.set(index, false));
		} else if (augmentedValue === maxBound) {
			negativeIndices.forEach((index) => solution.set(index, false));
			positiveIndices.forEach((index) => solution.set(index, true));
		}
	}

	return solution;
}
