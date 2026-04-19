import React from "react";
import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useDeviceType from "../hooks/useDeviceType";
import Board from "./Board";
import { getTimeString } from "../utils/timeutils";
import { App } from "@capacitor/app";
import {
	createBoard,
	checkWin,
	fillBoard,
	getRevealList,
	revealAdjacent,
} from "../utils/board";

import { solveBoard } from "../utils/solver";

const Game = ({
	config: {
		height,
		width,
		mineCount: argMineCount,
		lives: argLives,
		onWin: argOnWin,
		onLose: argOnLose,
		autoSolveMode,
		noGuessMode,
		winStateCheck,
		startZone,
	},
	isGameOver,
}) => {
	const [lives, setLives] = useState(argLives || 3);
	const [mineCount, setMineCount] = useState(argMineCount || 10);

	const [isFlaggingMode, setIsFlaggingMode] = useState(false);
	const flaggingModeRef = React.useRef(isFlaggingMode);

	const [hoveredCell, setHoveredCell] = useState(null);

	const [playTime, setPlayTime] = useState(0);

	const [isFirstClick, setFirstClick] = useState(true);

	const deviceType = useDeviceType();

	const startTimeRef = React.useRef(null);
	const accumulatedRef = React.useRef(0);
	const [displayTime, setDisplayTime] = useState(0);

	const isFirstClickRef = React.useRef(isFirstClick);
	const isGameOverRef = React.useRef(isGameOver);

	// Keep them in sync
	useEffect(() => {
		isFirstClickRef.current = isFirstClick;
	}, [isFirstClick]);
	useEffect(() => {
		isGameOverRef.current = isGameOver;
	}, [isGameOver]);

	const onWin = () => {
		argOnWin(getPlayTime());
	};

	const onLose = () => {
		argOnLose(getPlayTime());
	};

	const getPlayTime = () =>
		accumulatedRef.current +
		(startTimeRef.current ? Date.now() - startTimeRef.current : 0);

	// Display ticker
	useEffect(() => {
		if (isFirstClick || isGameOver) return;

		startTimeRef.current = Date.now();

		const interval = setInterval(() => {
			if (startTimeRef.current === null) return;
			setDisplayTime(
				accumulatedRef.current + (Date.now() - startTimeRef.current),
			);
		}, 100);

		return () => {
			clearInterval(interval);
			if (startTimeRef.current !== null) {
				accumulatedRef.current += Date.now() - startTimeRef.current;
				startTimeRef.current = null;
			}
		};
	}, [isFirstClick, isGameOver]);

	// Accumulate time pausing and resuming
	useEffect(() => {
		// console.log("add effect abc");
		const handlePause = () => {
			// console.log("paused");
			if (startTimeRef.current === null) return;
			accumulatedRef.current += Date.now() - startTimeRef.current;
			startTimeRef.current = null;
		};

		const handleResume = () => {
			// console.log("resumed");
			if (startTimeRef.current !== null) return;
			if (isFirstClickRef.current || isGameOverRef.current) return;
			startTimeRef.current = Date.now();
		};

		document.addEventListener("blur", handlePause, true);
		document.addEventListener("focus", handleResume, true);
	}, []);

	const [board, setBoard] = useState(() => createBoard(height, width));

	// If the game is over, show the whole board
	useEffect(() => {
		if (lives <= 0) {
			onLose();
			setBoard(
				board.map((row) =>
					row.map((cell) => {
						if (cell.isMine && !cell.isFlagged) {
							return {
								...cell,
								isRevealed: true,
							};
						}
						return cell;
					}),
				),
			);
		}
	}, [lives]);

	const chord = (x, y) => {
		const toChord = isCellComplete(x, y)
			? revealAdjacent(x, y, [[x, y]], board)
			: [[x, y]];
		// console.log(toChord);
		return batchReveal(toChord);
	};

	const isCellComplete = (x, y) => {
		const count = board[x][y].content;
		if (count === 0) {
			// console.log("Count zero at " + x + ", " + y);
			return false;
		}
		let countFlagged = 0;
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
				if (
					board[x + i][y + j].isFlagged ||
					(board[x + i][y + j].isRevealed &&
						board[x + i][y + j].isMine)
				) {
					countFlagged++;
				}
			}
		}

		return count === countFlagged;
	};

	const batchReveal = (list) => {
		const newBoard = board.map((row) => row.map((cell) => cell));

		list.forEach(([x, y]) => {
			if (newBoard[x][y].isFlagged) {
				setMineCount(mineCount);
				newBoard[x][y].isFlagged = false;
			}
			newBoard[x][y].isRevealed = true;

			if (board[x][y].isMine === true) {
				setMineCount(mineCount - 1);
				setLives(lives - 1);
			}
		});
		return newBoard;
	};

	const firstClick = (x, y) => {
		// console.log("First click");
		setFirstClick(false);

		const newBoard = fillBoard(x, y, startZone, board, mineCount);

		if (autoSolveMode) {
			setTimeout(() => {
				solveBoard(newBoard);
			}, 500);
		}

		return newBoard;
	};

	const flag = (x, y) => {
		if (board[x][y].isRevealed) {
			return;
		}
		setMineCount(mineCount - 1);
		return board.map((r, i) =>
			r.map((c, j) => {
				if (x === i && y === j) {
					return { ...c, isFlagged: true };
				}
				return c;
			}),
		);
	};

	const unflag = (x, y) => {
		setMineCount(mineCount + 1);
		return board.map((r, i) =>
			r.map((c, j) => {
				if (x === i && y === j) {
					return { ...c, isFlagged: false };
				}
				return c;
			}),
		);
	};

	const handleFlag = (e, i, j) => {
		e.preventDefault();

		const cell = board[i][j];

		if (isFirstClick) return handleReveal(e, i, j);

		//Automated behavior
		if (autoSolveMode) {
			return;
		}

		//Normal behavior
		const newBoard = cell.isRevealed
			? chord(i, j)
			: cell.isFlagged
				? unflag(i, j)
				: flag(i, j);

		setBoard(newBoard);

		if (checkWin(board, winStateCheck, lives)) {
			onWin();
		}
	};

	const handleReveal = (e, i, j) => {
		e.preventDefault();

		const cell = board[i][j];

		// console.log("Left click");
		let newBoard;

		newBoard = isFirstClick
			? firstClick(i, j)
			: autoSolveMode
				? board
				: cell.isRevealed
					? chord(i, j)
					: cell.isFlagged
						? unflag(i, j)
						: batchReveal(getRevealList(i, j, [], board));

		setBoard(newBoard);

		if (checkWin(board, winStateCheck, lives)) {
			onWin();
		}
	};

	const onHover = (e, coords) => {
		setHoveredCell(coords);
		// console.log(hoveredCell);
	};

	const actionOnKeyDown = (e) => {
		if (hoveredCell == null) return;
		const isFlaggingMode = flaggingModeRef.current;
		const doesMatchAction =
			e.code === "Enter" ||
			e.code === "NumpadEnter" ||
			e.code === "Space";

		// console.log(e.code);
		// console.log(doesMatch);
		// console.log(e.shiftKey);
		if (
			(doesMatchAction && !e.shiftKey && !isFlaggingMode) ||
			(doesMatchAction && e.shiftKey && isFlaggingMode)
		) {
			onLeftClick(e, ...hoveredCell);
		} else if (
			(doesMatchAction && e.shiftKey && !isFlaggingMode) ||
			(doesMatchAction && !e.shiftKey && isFlaggingMode)
		) {
			onRightClick(e, ...hoveredCell);
		}
	};

	const switchModeOnKeyDown = (e) => {
		if (e.code === "KeyF" && !e.repeat) {
			setIsFlaggingMode((prev) => !prev);
		}
	};

	const onLeftClick = (e, i, j) => {
		// e.currentTarget.blur();

		isFlaggingMode ? handleFlag(e, i, j) : handleReveal(e, i, j);
	};

	const onRightClick = (e, i, j) => {
		// e.currentTarget.blur();

		isFlaggingMode ? handleReveal(e, i, j) : handleFlag(e, i, j);
	};

	useEffect(() => {
		const handler = (e) => {
			actionOnKeyDown(e);
			switchModeOnKeyDown(e);
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [hoveredCell, isFlaggingMode, board]);

	return (
		<>
			<TransformWrapper
				centerOnInit={true}
				initialScale={1}
				pinch={{ disabled: false }}
				pan={{
					disabled: false,
					allowRightClickPan: false,
					allowLeftClickPan: false,
				}}
				doubleClick={{ mode: "toggle", disabled: true }}
			>
				<TransformComponent>
					<Board
						board={board}
						onLeftClick={onLeftClick}
						onRightClick={onRightClick}
						onHover={onHover}
					/>
				</TransformComponent>
			</TransformWrapper>
			<h2 className={"stats " + (isGameOver ? "game-over" : "")}>
				<span className="minecount">{mineCount} 🚩</span>{" "}
				<span className="playtime">{getTimeString(getPlayTime())}</span>
				<span className="lives">
					{new Array(argLives)
						.fill("🖤")
						.map((v, i) => (i < lives ? "❤️" : v))
						.join("")}
				</span>
			</h2>

			{!isGameOver && (
				<div className="bottom-buttons">
					<button
						className={isFlaggingMode ? "" : "active"}
						onClick={() => setIsFlaggingMode(false)}
					>
						💣
					</button>
					<button
						className={isFlaggingMode ? "active" : ""}
						onClick={() => setIsFlaggingMode(true)}
					>
						🚩
					</button>
				</div>
			)}
		</>
	);
};

export default Game;
