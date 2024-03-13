import React from "react";

const Board = ({ board, lives, mineCount, onLeftClick, onRightClick }) => {
	const getNumberName = (number) => {
		switch (number) {
			case 1:
				return "one";
			case 2:
				return "two";
			case 3:
				return "three";
			case 4:
				return "four";
			case 5:
				return "five";
			case 6:
				return "six";
			case 7:
				return "seven";
			case 8:
				return "eight";
			default:
				return "zero";
		}
	};

	return (
		<div>
			{mineCount && lives ? (
				<h2>
					🚩: {mineCount} Lives: {lives}
				</h2>
			) : null}

			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((cell, j) => (
						<button
							key={j}
							className={
								"cell" +
								(cell.isRevealed ? " revealed" : "") +
								(cell.isFlagged ? " flagged" : "") +
								(typeof cell.content === "number"
									? " " + getNumberName(cell.content)
									: "")
							}
							onClick={(e) => onLeftClick(i, j, cell)}
							onContextMenu={(e) => onRightClick(e, i, j, cell)}
						>
							{!board[i][j].isRevealed
								? board[i][j].isFlagged
									? "🚩"
									: " "
								: board[i][j].isMine
								? "💣"
								: board[i][j].content == "0"
								? " "
								: board[i][j].content}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
