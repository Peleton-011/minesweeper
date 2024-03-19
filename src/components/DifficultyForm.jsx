import React from "react";
import { useState } from "react";

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
	},
	setConfig,
}) => {
	//Bind the inputs
	const [heightInput, setHeightInput] = useState(height);
	const [widthInput, setWidthInput] = useState(width);
	const [mineCountInput, setMineCountInput] = useState(mineCount);

	const onSubmit = (e) => {
		e.preventDefault();
		setConfig({ height: heightInput, width: widthInput, mineCount: mineCountInput });
	};
	return (
		<form onSubmit={onSubmit}>
			<h3>{difName}</h3>
			<div>
				{height || width ? (
					<span>
						{height
							? height
							: width + "x" + width
							? width
							: height + " tiles"}
					</span>
				) : (
					<fieldset>
						<legend>Size</legend>
						<label htmlFor="height">
							<span>Height </span>
							<input
								type="number"
								id="height"
								name="height"
								defaultValue={16}
								min="1"
								max="50"
								onChange={(e) => {
									setHeightInput(e.target.value);
								}}
							/>
						</label>
						<label htmlFor="width">
							<input
								type="number"
								id="width"
								name="width"
								defaultValue={30}
								min="8"
								max="99"
								onChange={(e) => {
									setWidthInput(e.target.value);
								}}
							/>
						</label>
					</fieldset>
				)}
				<span>{mineCount + " mines"}</span>
			</div>
			<label htmlFor="isOneMistake">
				<input type="checkbox" id="isOneMistake" name="isOneMistake" />{" "}
				One mistake
			</label>
			<button type="submit">Play</button>
		</form>
	);
};

export default DifficultyForm;
