import React from "react";
import Board from "./Board";
import DifficultyForm from "./DifficultyForm";
import { useState } from "react";

const DifficultyDisplay = ({ config, setConfig, setIsGameStarted }) => {
	const getBoard = (h, w) => {
		return Array(h)
			.fill()
			.map(() => {
				return Array(w)
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
	const [board, setBoard] = useState(getBoard(config.height, config.width));

	const onClickBoard = () => {
		() => setIsGameStarted(true);
		const activeSlide = document.querySelector(".slide.active");
		//find form child
		const form = activeSlide.children[0].children[1];

		form.requestSubmit();
	};

	return (
		<div>
			<Board
				board={board}
				onLeftClick={onClickBoard}
				onRightClick={(e) => {
					e.preventDefault();
				}}
				style={{ transform: "scale(0.5)", marginTop: "1em" }}
				className="boardie"
			/>
			<DifficultyForm
				config={config}
				setConfig={(args) => {
					setConfig(args);
					setBoard(getBoard(args.height, args.width));
				}}
				setIsGameStarted={setIsGameStarted}
			/>
		</div>
	);
};

export default DifficultyDisplay;
