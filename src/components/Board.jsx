import React from "react";

const Board = ({ board, click }) => {
	console.log(board);
	return (
		<div>
			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((cell, j) => (
						<button
							key={j}
							className={
								"cell" + (cell.isRevealed ? " revealed" : "")
							}
							onClick={() => click(i, j)}
						>
							{!cell.isRevealed
								? " "
								: cell.content === "0"
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
