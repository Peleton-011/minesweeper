import React from "react";

const Board = ({ board }) => {
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
						>
							{!cell.isRevealed
								? " "
								: cell.content === "0"
								? " "
								: cell}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
