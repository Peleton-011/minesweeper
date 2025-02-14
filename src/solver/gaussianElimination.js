/**
 * Solves a system of linear equations using Gaussian Elimination with partial pivoting.
 * The input matrix should be in augmented form [A|b] where A is the coefficient matrix
 * and b is the constant vector.
 * 
 * @param {number[][]} matrix - The input matrix
 * @param {number} epsilon - Optional numerical tolerance (default: 1e-10)
 * @returns {number[][]} - The eliminated matrix
 */
function gaussianElimination(matrix, epsilon = 1e-10) {
    if (!matrix || !matrix.length) {
        throw new Error("Invalid matrix");
    }

    // Create a deep copy of the matrix
    const n = matrix.length;
    const m = matrix[0].length;
    const augMatrix = matrix.map(row => [...row]);

    // Forward elimination
    for (let i = 0; i < n; i++) {
        // Find pivot
        let maxRow = i;
        let maxVal = Math.abs(augMatrix[i][i]);

        for (let k = i + 1; k < n; k++) {
            const absVal = Math.abs(augMatrix[k][i]);
            if (absVal > maxVal) {
                maxVal = absVal;
                maxRow = k;
            }
        }

        // Skip if pivot is too small
        if (maxVal < epsilon) continue;

        // Swap rows if necessary
        if (maxRow !== i) {
            [augMatrix[i], augMatrix[maxRow]] = [augMatrix[maxRow], augMatrix[i]];
        }

        // Normalize pivot row
        const pivot = augMatrix[i][i];
        for (let j = i; j < m; j++) {
            augMatrix[i][j] /= pivot;
        }

        // Eliminate column
        for (let k = 0; k < n; k++) {
            if (k !== i && Math.abs(augMatrix[k][i]) > epsilon) {
                const factor = augMatrix[k][i];
                for (let j = i; j < m; j++) {
                    augMatrix[k][j] -= factor * augMatrix[i][j];
                }
            }
        }
    }

    return augMatrix;
}

/**
 * Helper function to check if a solution is valid for the original system
 * 
 * @param {number[][]} originalMatrix - The original augmented matrix
 * @param {number[]} solution - The computed solution
 * @param {number} epsilon - Tolerance for floating point comparisons
 * @returns {boolean} - Whether the solution is valid
 */
function verifySolution(originalMatrix, solution, epsilon = 1e-10) {
    const n = originalMatrix.length;
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
            sum += originalMatrix[i][j] * solution[j];
        }
        if (Math.abs(sum - originalMatrix[i][n]) > epsilon) {
            return false;
        }
    }
    return true;
}

// Example usage:
/*
const matrix = [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
];

try {
    const solution = gaussianElimination(matrix);
    console.log('Solution:', solution);
    console.log('Verified:', verifySolution(matrix, solution));
} catch (error) {
    console.error('Error:', error.message);
}
*/

function backSubstitution(matrix) {
    let n = matrix.length;
    let solution = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = matrix[i][n];
        for (let j = i + 1; j < n; j++) {
            solution[i] -= matrix[i][j] * solution[j];
        }
    }
    return solution;
}

export { gaussianElimination, backSubstitution, verifySolution };