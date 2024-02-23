import React from "react";

const Board = ({ board }) => {
	return (
		<div>
			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((cell, j) => (
						<button key={j} className="cell">
							{cell}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;