/* Cells are: 
{
	isMine: boolean,
	isRevealed: boolean,
	isFlagged: boolean,
	content: number,
}
*/

export function findAdjacentCells({ coords: [x, y], board }) {
	const directions = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[-1, 0],
		[1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
	];

	return directions
		.map(([dx, dy]) => {
			const newX = x + dx;
			const newY = y + dy;

			if (
				newX < 0 ||
				newY < 0 ||
				newX >= board.length ||
				newY >= board[newX].length
			) {
				return null;
			}
			return board[newX][newY];
		})
		.filter((v) => v !== null);
}

// conditionA and conditionB should be functions that take in a cell and return a boolean
export function findPairedCells({ board, conditionA, conditionB }) {
	const groupA = [];
	const groupB = [];
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const cell = board[i][j];
			if (conditionA(cell)) {
				const adjacent = findAdjacentCells({
					coords: [i, j],
					board,
				}).filter(conditionB);
				if (!adjacent.length) {
					continue;
				}
				groupA.push(cell);
				groupB.push(
					// Filter the adjacent array to remove duplicates by comparing coordinates
					...adjacent.filter((adj) => {
						return !groupB.find(
							(c) => c.x === adj.x && c.y === adj.y
						);
					})
				);
			}
		}
	}
	return { a: groupA, b: groupB };
}

export function calculateAugmentedMatrix({
	activeCells,
	incognitaCells,
	board,
}) {
	const augmentedMatrix = [];
	// Each active cell represents a row in the augmented matrix
	activeCells.forEach((act, i) => {
		augmentedMatrix.push([]);
		// Each incognita is assigned a column in the augmented matrix, plus the extra column
		incognitaCells.forEach((inc, j) => {
			augmentedMatrix[i].push(
				findAdjacentCells({ coords: [act.x, act.y], board }).includes(
					inc
				)
					? 1
					: 0
			);
		});
		augmentedMatrix[i].push(act.content);
	});
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
