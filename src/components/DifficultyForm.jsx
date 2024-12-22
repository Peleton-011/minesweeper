import React, { useEffect } from "react";
import { useState } from "react";
import "./DifficultyForm.css";

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
	setIsGameStarted,
}) => {
	//Bind the inputs
	const [heightInput, setHeightInput] = useState(height || 16);
	const [widthInput, setWidthInput] = useState(width || 30);
	const [mineCountInput, setMineCountInput] = useState(mineCount || 99);

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

	useEffect(() => {
		setConfig({
			height: Number(heightInput),
			width: Number(widthInput),
			mineCount: Number(mineCountInput),
			lives: Number(livesInput),
			noGuessMode: noGuessModeInput,
			autoSolveMode: autoSolveModeInput,
			winStateCheck: winStateCheckInput,
			startZone: startZoneInput,
		});
	}, [
		heightInput,
		widthInput,
		mineCountInput,
		livesInput,
		noGuessModeInput,
		autoSolveModeInput,
		winStateCheckInput,
		startZoneInput,
	]);
	const onSubmit = (e) => {
		e.preventDefault();
		setConfig({
			height: Number(heightInput),
			width: Number(widthInput),
			mineCount: Number(mineCountInput),
			lives: Number(livesInput),
			noGuessMode: noGuessModeInput,
			autoSolveMode: autoSolveModeInput,
			winStateCheck: winStateCheckInput,
			startZone: startZoneInput,
		});
		setIsGameStarted(true);
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

	const sizeDisplay = (height, width) => {
		return (
			<span>
				{height
					? width
						? height + " x " + width
						: height + " x " + height
					: width + " x " + width}{" "}
				tiles
			</span>
		);
	};
	const mineDisplay = (mineCount) => {
		return <span>{mineCount + " mines"}</span>;
	};

	const sizeInput = () => {
		return (
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
				<label htmlFor="isSquare">
					<span>Square Board </span>
					<input
						type="checkbox"
						name="isSquare"
						onChange={onSquare}
					/>
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
		);
	};

	const mineInput = () => {
		return (
			<label htmlFor="mineCount">
				<span>Mines </span>
				<div>
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
				</div>
			</label>
		);
	};

	return (
		<form onSubmit={onSubmit}>
			<h3>{difName}</h3>
			{(height || width) && mineCount ? (
				<div>
					{sizeDisplay(height, width)} | {mineDisplay(mineCount)}
				</div>
			) : height || width ? (
				<>{...[sizeDisplay(height, width), mineInput()]}</>
			) : mineCount ? (
				<>{...[sizeInput(), mineDisplay(mineCount)]}</>
			) : (
				<>{...[sizeInput(), mineInput()]}</>
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
									setLivesInput(e.target.checked ? 1 : lives);
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
			{noGuessMode === undefined ? (
				<label htmlFor="noGuessMode">
					{"No Guess Mode "}
					<input
						type="checkbox"
						id="noGuessMode"
						name="noGuessMode"
						onChange={(e) => {
							setNoGuessModeInput(e.target.checked);
						}}
					/>
				</label>
			) : null}
			{autoSolveMode === undefined ? (
				<label htmlFor="autoSolveMode">
					{"Auto Solve "}
					<input
						type="checkbox"
						id="autoSolveMode"
						name="autoSolveMode"
						onChange={(e) => {
							setAutoSolveModeInput(e.target.checked);
						}}
					/>
				</label>
			) : null}
			{winStateCheck === undefined ? (
				<label htmlFor="winStateCheck">
					{"Win State"}
					<select
						id="winStateCheck"
						name="winStateCheck"
						onChange={(e) => {
							setWinStateCheckInput(e.target.value);
						}}
					>
						<option value="revealAll">
							All Empty Cells Revealed
						</option>
						<option value="flagAll">All Mines Flagged</option>
						<option value="both">Both</option>
					</select>
				</label>
			) : null}
			{startZone === undefined ? (
				<label htmlFor="startZone">
					{"Start Zone "}
					<input
						type="number"
						id="startZone"
						name="startZone"
						min="1"
						max={Math.min(heightInput, widthInput) - 1}
						onChange={(e) => {
							setStartZoneInput(e.target.value);
						}}
					/>
				</label>
			) : null}
			<button type="submit">Play</button>
		</form>
	);
};

export default DifficultyForm;
