import React from "react";
import Carousel from "./Carousel";
import DifficultyDisplay from "./DifficultyDisplay";

const ConfigSelector = ({ setConfig }) => {
	const standardDifficulties = [
		{
			height: 8,
			width: 8,
			mineCount: 10,
			lives: 3,
			autoSolveMode: false,
			noGuessMode: false,
			difName: "Easy",
		},
		{
			height: 16,
			width: 16,
			mineCount: 40,
			lives: 3,
			autoSolveMode: false,
			noGuessMode: false,
			difName: "Medium",
		},
		{
			height: 16,
			width: 30,
			mineCount: 99,
			lives: 3,
			autoSolveMode: false,
			noGuessMode: false,
			difName: "Hard",
		},
	];

	return (
		<div>
			<Carousel
				title="Select a difficulty"
				pages={[...standardDifficulties, { difName: "Custom" }].map(
					(dif, i) => (
						<DifficultyDisplay
							key={i}
							config={dif}
							setConfig={setConfig}
						/>
					)
				)}
			/>
		</div>
	);
};

export default ConfigSelector;
