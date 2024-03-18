import React from "react";
import Board from "./Board";

const DifficultyDisplay = ({
	config: { height, width, mineCount, difName },
	setConfig,
}) => {
	const getBoard = () => {
		return Array(height)
			.fill()
			.map(() => {
				return Array(width)
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
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setConfig({ height, width, mineCount });
					console.log(difName);
				}}
			>
				<h3>{difName}</h3>
				<p>
					<span>{height + "x" + width + " tiles"}</span> |{" "}
					<span>{mineCount + " mines"}</span>
				</p>
				<label htmlFor="isOneMistake">
					<input
						type="checkbox"
						id="isOneMistake"
						name="isOneMistake"
					/>{" "}
					One mistake
				</label>
				<button type="submit">Play</button>
			</form>
		</div>
	);
};

export default DifficultyDisplay;
