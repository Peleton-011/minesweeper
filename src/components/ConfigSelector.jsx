import React from "react";
import Carousel from "./Carousel";
import DifficultyDisplay from "./DifficultyDisplay";

const ConfigSelector = ({ setConfig, setIsGameStarted }) => {
	const baseDifficulty = {
		winStateCheck: "revealAll",
		startZone: 3,
		lives: 3,
		autoSolveMode: false,
		noGuessMode: false,
	};
	const standardDifficulties = [
		{
            ...baseDifficulty,
			height: 8,
			width: 8,
			mineCount: 10,
			difName: "Easy",
		},
		{
            ...baseDifficulty,
			height: 16,
			width: 16,
			mineCount: 40,
			difName: "Medium",
		},
		{
            ...baseDifficulty,
			height: 16,
			width: 30,
			mineCount: 99,
			difName: "Hard",
		},
	];

	return (
		<div>
			<Carousel
				title="Select a difficulty"
				pages={[
					...standardDifficulties,
					{
						difName: "Custom",
						autoSolveMode: false, //To be removed with autosolve
						noGuessMode: false, //To be removed with autosolve
					},
				].map((dif, i) => (
					<DifficultyDisplay
						key={i}
						config={dif}
						setConfig={setConfig}
                        setIsGameStarted={setIsGameStarted}
					/>
				))}
			/>
		</div>
	);
};

export default ConfigSelector;
