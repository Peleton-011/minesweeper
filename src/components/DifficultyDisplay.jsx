import React from "react";
import Board from "./Board";
import DifficultyForm from "./DifficultyForm";

const DifficultyDisplay = ({ config, setConfig }) => {
	const getBoard = () => {
		return Array(config.height)
			.fill()
			.map(() => {
				return Array(config.width)
					.fill()
					.map(() => {
						return {
							isMine: false,
							isRevealed: false,
							isFlagged: false,
							content: 0,
						};
					});
			});
	};

	return (
		<div>
			<Board
				board={getBoard()}
				onLeftClick={() => {}}
				onRightClick={(e) => {
					e.preventDefault();
				}}
				style={{ transform: "scale(0.5)", marginTop: "1em" }}
				className="boardie"
			/>
			<DifficultyForm config={config} setConfig={setConfig} />
		</div>
	);
};

export default DifficultyDisplay;
