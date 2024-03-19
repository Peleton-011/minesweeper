import React from "react";

const DifficultyForm = ({
	config: {
		height,
		width,
		mineCount,
		lives,
		noGuessMode,
		autoSolveMode,
		winStateCheck,
		startZone,
        difName,
        onSubmit
	},
}) => {
	return (
		<form
			onSubmit={onSubmit}
		>
			<h3>{difName}</h3>
			<p>
				<span>{height + "x" + width + " tiles"}</span> |{" "}
				<span>{mineCount + " mines"}</span>
			</p>
			<label htmlFor="isOneMistake">
				<input type="checkbox" id="isOneMistake" name="isOneMistake" />{" "}
				One mistake
			</label>
			<button type="submit">Play</button>
		</form>
	);
};

export default DifficultyForm;
