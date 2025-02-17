import React from "react";
import {
	gaussianElimination,
	verifySolution,
} from "../solver/gaussianElimination.js";

import { solveEliminatedMatrix } from "../solver/utils.js";

import { boardGenerator } from "../solver/boardGenerator.js";

import Board from "./Board.jsx";

const TestPage = () => {
	let augmentedMatrix = [
		[1, 1, 0, 0, 0, 1],
		[1, 1, 1, 0, 0, 2],
		[0, 1, 1, 1, 0, 2],
		[0, 0, 1, 1, 1, 2],
		[0, 0, 0, 1, 1, 1],
	];

	let mineMatrix;

	try {
		const solution = gaussianElimination(augmentedMatrix);
		console.log("Solution:", solution);
		console.log("Verified:", verifySolution(augmentedMatrix, solution));
		const final = solveEliminatedMatrix(solution);
		console.log("Final: ", final);
	} catch (error) {
		console.error("Error:", error.message);
	}

	const generatedBoard = boardGenerator({mineCount: 99});
	return <div>
        <h1>Test Page</h1>
        <Board board={generatedBoard} />
    </div>;
};

export default TestPage;
