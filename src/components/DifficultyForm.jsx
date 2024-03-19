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

	const [livesInput, setLivesInput] = useState(lives || 3);
	const [noGuessModeInput, setNoGuessModeInput] = useState(
		noGuessMode || false
	);
	const [autoSolveModeInput, setAutoSolveModeInput] = useState(
		autoSolveMode || false
	);

	const [winStateCheckInput, setWinStateCheckInput] = useState(
		["revealAll", "flagAll", "both"].find((x) => x === winStateCheck)
			? winStateCheck
			: "revealAll"
	);
	const [startZoneInput, setStartZoneInput] = useState(startZone || 3);

	const onSubmit = (e) => {
		e.preventDefault();
		setConfig({
			height: Number(heightInput),
			width: Number(widthInput),
			mineCount: Number(mineCountInput),
			lives: Number(livesInput),
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
							? width
								? height + " x " + width
								: height + " x " + height
							: width + " x " + width}{" "}
						tiles
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
				{lives ? (
					lives > 1 ? (
						<>
							<span>{lives + " lives"}</span>
							<label htmlFor="isOneMistake">
								{"One mistake "}
								<input
									type="checkbox"
									id="isOneMistake"
									name="isOneMistake"
									onChange={(e) => {
										setLivesInput(
											e.target.checked ? 1 : lives
										);
									}}
								/>
							</label>
						</>
					) : null
				) : (
					<label htmlFor="lives">
						{"Lives "}
						<input
							type="number"
							id="lives"
							name="lives"
							defaultValue={3}
							min="1"
							onChange={(e) => {
								setLivesInput(e.target.value);
							}}
						/>{" "}
					</label>
				)}
			</div>
			<button type="submit">Play</button>
		</form>
	);
};

export default DifficultyForm;
