import React from "react";
import {
	gaussianElimination,
	verifySolution,
} from "../solver/gaussianElimination.js";

import {
	findPairedCells,
	calculateAugmentedMatrix,
	solveEliminatedMatrix,
} from "../solver/utils.js";

import MatrixDisplay from "../solver/MatrixDisplay/MatrixDisplay.jsx";

import { boardGenerator } from "../solver/boardGenerator.js";

import Board from "./Board.jsx";

function styleCell(y, x, styleProperty, value) {
	const rows = document.querySelectorAll(".row");
	const height = rows.length;
	console.log(rows);
	console.log(y);
	if (height === 0) return; // No board present

	const width = rows[0].querySelectorAll(".cell").length;

	if (x < 0 || x >= width || y < 0 || y >= height) {
		console.error("Invalid cell coordinates");
		return;
	}

	// const domRowIndex = height - 1 - y; // Flip Y-axis
	const cell = rows[y].querySelectorAll(".cell")[x];

	if (cell) {
		cell.style[styleProperty] = value;
	}
}

const findMoves = (matrixSolution, incognitas) => {
	const { true: mineSolutions, false: safeSolutions } = separateMapValues(solveEliminatedMatrix(matrixSolution));
    mineSolutions.forEach((mineSolution, index) => {
        mineSolutions[index] = incognitas[mineSolution];
    })
    safeSolutions.forEach((safeSolution, index) => {
        safeSolutions[index] = incognitas[safeSolution];
    })
    return { mineSolutions, safeSolutions };
};

function separateMapValues(inputMap) {
	const result = { true: [], false: [] };

	inputMap.forEach((value, key) => {
		result[key ? "true" : "false"].push(value);
	});

	return result;
}

const TestPage = () => {
	const [augmentedMatrix, setAugmentedMatrix] = React.useState([]);
	const [eliminatedMatrix, setEliminatedMatrix] = React.useState([]);
	const [nextMoves, setNextMoves] = React.useState([]);

	const [incognitas, setIncognitas] = React.useState([]);
	const [active, setActive] = React.useState([]);

	const generatedBoard = [
		[
			{
				x: 0,
				y: 0,
				isMine: true,
				isRevealed: false,
				isFlagged: false,
				content: 0,
			},
			{
				x: 1,
				y: 0,
				isMine: false,
				isRevealed: true,
				isFlagged: false,
				content: 1,
			},
		],
		[
			{
				x: 0,
				y: 1,
				isMine: false,
				isRevealed: false,
				isFlagged: false,
				content: 2,
			},
			{
				x: 1,
				y: 1,
				isMine: false,
				isRevealed: true,
				isFlagged: false,
				content: 2,
			},
		],
		[
			{
				x: 0,
				y: 2,
				isMine: true,
				isRevealed: false,
				isFlagged: false,
				content: 1,
			},
			{
				x: 1,
				y: 2,
				isMine: false,
				isRevealed: true,
				isFlagged: false,
				content: 2,
			},
		],
		[
			{
				x: 0,
				y: 3,
				isMine: true,
				isRevealed: false,
				isFlagged: false,
				content: 1,
			},
			{
				x: 1,
				y: 3,
				isMine: false,
				isRevealed: true,
				isFlagged: false,
				content: 2,
			},
		],
		[
			{
				x: 0,
				y: 4,
				isMine: false,
				isRevealed: false,
				isFlagged: false,
				content: 1,
			},
			{
				x: 1,
				y: 4,
				isMine: false,
				isRevealed: true,
				isFlagged: false,
				content: 1,
			},
		],
	]; //boardGenerator({ mineCount: 99 });

	function updateAugmentedMatrix() {
		const { a: active, b: incognita } = findPairedCells({
			board: generatedBoard,
			conditionA: (cell) => cell.isRevealed && cell.content > 0,
			conditionB: (cell) => !cell.isRevealed,
		});

		setActive(active);
		setIncognitas(incognita);

		setAugmentedMatrix(
			calculateAugmentedMatrix({
				activeCells: active,
				incognitaCells: incognita,
				board: generatedBoard,
			})
		);
	}

	function updateEliminatedMatrix() {
		try {
			const solution = gaussianElimination(augmentedMatrix);
			console.log("Solution:", solution);
			setEliminatedMatrix(solution);
			console.log("Verified:", verifySolution(augmentedMatrix, solution));
			const final = solveEliminatedMatrix(solution);
			console.log("Final: ", final);
		} catch (error) {
			console.error("Error:", error.message);
		}
	}

	function updateNextMoves() {
		setNextMoves(findMoves(eliminatedMatrix, incognitas));
	}

	// console.log(findMoves(generatedBoard));

	return (
		<div>
			<h1>Test Page</h1>
			<Board board={generatedBoard} />
			<h3>Active: </h3>
			<div>
				{active.map(({ x, y }) => "(" + x + ", " + y + ")").join("  ")}
			</div>
			<h3>Incognitas: </h3>
			<div>
				{incognitas
					.map(({ x, y }) => "(" + x + ", " + y + ")")
					.join("  ")}
			</div>
			<h3>Augmented Matrix</h3>
			<MatrixDisplay matrix={augmentedMatrix} augmented />
			<h3>Eliminated Matrix</h3>
			<MatrixDisplay matrix={eliminatedMatrix} augmented />
			<h3>Resulting Moves</h3>
			<div>{JSON.stringify(nextMoves, null, 2)}</div>

			<button onClick={() => updateAugmentedMatrix()}>Solve</button>
			<button onClick={() => updateEliminatedMatrix()}>Eliminate</button>
			<button onClick={() => updateNextMoves()}>
				Calculate next moves
			</button>
		</div>
	);
};

export default TestPage;
