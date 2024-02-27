import React from "react";

const Board = ({ board, reveal, lives, flag, unflag, mineCount }) => {
	console.log(board);
	return (
		<div>
			<h2>🚩: {mineCount}    Lives: {lives}</h2>
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
							onClick={
								cell.isFlagged
									? () => unflag(i, j)
									: () => reveal(i, j)
							}
							onContextMenu={(e) => {
								e.preventDefault();
								const f = cell.isRevealed
									? () => {}
									: cell.isFlagged
									? () => unflag(i, j)
									: () => flag(i, j);

								f();
							}}
						>
							{!cell.isRevealed
								? cell.isFlagged
									? "🚩"
									: " "
								: cell.isMine
								? "💣"
								: cell.content == "0"
								? " "
								: cell.content}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
