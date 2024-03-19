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
	const [heightInput, setHeightInput] = useState(height || 16);
	const [widthInput, setWidthInput] = useState(width || 30);
	const [mineCountInput, setMineCountInput] = useState(mineCount);

	const onSubmit = (e) => {
		e.preventDefault();
		setConfig({
			height: heightInput,
			width: widthInput,
			mineCount: mineCountInput,
		});
	};

	const onSquare = (e) => {
		const widthInputElement = document.getElementById("width");
		if (e.target.checked) {
			widthInputElement.value = heightInput;
			setWidthInput(heightInput);
		}
		widthInputElement.disabled = e.target.checked;
	};

	const getRecommendedMines = (height, width) => {
		return Math.floor(
			(309 / 2080 + (height * width) / 8320) * width * height
		);
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

							<label htmlFor="isSquare">
								<span>Square Board </span>
								<input
									type="checkbox"
									name="isSquare"
									onChange={onSquare}
								/>
							</label>
						</label>
						<label htmlFor="width">
							<span>Width </span>
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
				{(height || width) && mineCount ? "  |  " : null}
				{mineCount ? (
					<span>{mineCount + " mines"}</span>
				) : (
					<label htmlFor="mineCount">
						<span>Mines </span>
						<input
							type="number"
							id="mineCount"
							name="mineCount"
							defaultValue={99}
							min="1"
							max={(heightInput - 1) * (widthInput - 1)}
							onChange={(e) => {
								setMineCountInput(e.target.value);
							}}
						/>
						<span className="suggest">
							{" "}
							(recommended:{" "}
							{getRecommendedMines(heightInput, widthInput)})
						</span>
					</label>
				)}
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
