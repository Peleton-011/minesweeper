import React from "react";

const Board = ({
	board,
	lives,
	mineCount,
	onLeftClick,
	onRightClick,
	getContent,
}) => {
	console.log(board);
	return (
		<div>
			<h2>
				🚩: {mineCount} Lives: {lives}
			</h2>
			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((cell, j) => (
						<button
							key={j}
							className={
								"cell" +
								(cell.isRevealed ? " revealed" : "") +
								(cell.isFlagged ? " flagged" : "")
							}
							onClick={(e, i, j) => onLeftClick(i, j)}
							onContextMenu={(e) => onRightClick(e, cell)}
						>
							{getContent(cell)}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
