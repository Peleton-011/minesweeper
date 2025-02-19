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

const findMoves = (solution) => {
	try {
		const final = solveEliminatedMatrix(solution);
        return final;
		console.log("Final: ", final);
	} catch (error) {
		console.error("Error:", error.message);
	}
};

const solver = (board) => {
	const { a: active, b: incognita } = findPairedCells({
		board,
		conditionA: (cell) => cell.isRevealed && cell.content > 0,
		conditionB: (cell) => !cell.isRevealed,
	});
	/*
	a.forEach(({ x: col, y: row }) => {
		styleCell(row, col, "background-color", "rgba(255, 0, 0, 0.5)");
        });
    */

	console.log(active, incognita);

	const augmentedMatrix = calculateAugmentedMatrix({
		activeCells: active,
		incognitaCells: incognita,
		board,
	});
	console.log(augmentedMatrix);
	// try {
	//     const solution = gaussianElimination(augmentedMatrix);
	//     console.log("Solution:", solution);
	//     console.log("Verified:", verifySolution(augmentedMatrix, solution));
	//     const final = solveEliminatedMatrix(solution);
	//     console.log("Final: ", final);
	// } catch (error) {
	//     console.error("Error:", error.message);
	// }

	return augmentedMatrix;
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
		setNextMoves(separateMapValues(findMoves(eliminatedMatrix)));
	}

	// console.log(findMoves(generatedBoard));

	return (
		<div>
			<h1>Test Page</h1>
			<Board board={generatedBoard} />
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
