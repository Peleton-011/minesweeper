import React from "react";

const Board = ({
	board,
	lives,
	mineCount,
	onLeftClick,
	onRightClick,
	getContent,
}) => {
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
							onClick={(e) => onLeftClick(i, j, cell)}
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
