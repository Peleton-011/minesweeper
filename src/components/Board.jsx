import React from "react";

const Board = ({ board, onLeftClick, onRightClick, onHover = () => {} }) => {
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

	// console.log(onHover)

	return (
		<div className="board">
			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((cell, j) => (
						<div
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									onLeftClick(e, i, j, cell);
								}
							}}
							key={j}
							className={
								"cell" +
								(cell.isRevealed ? " revealed" : "") +
								(cell.isFlagged ? " flagged" : "") +
								(typeof cell.content === "number"
									? " " + getNumberName(cell.content)
									: "")
							}
							onClick={(e) => onLeftClick(e, i, j, cell)}
							onContextMenu={(e) => onRightClick(e, i, j, cell)}
							onMouseEnter={(e) => onHover(e, i, j, cell)}
							onMouseLeave={(e) => onHover(e, i, j, null)}
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
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
