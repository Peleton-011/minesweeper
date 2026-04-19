import React from "react";
import Carousel from "@/components/Carousel/Carousel";
import DifficultyDisplay from "@/components/Carousel/DifficultyDisplay";
import { standardDifficulties } from "@/utils/difficulties";

const ConfigSelector = ({ initialConfig }) => {
	const difficulties = [
		...standardDifficulties,
		{
			difName: "Custom",
			autoSolveMode: false, //To be removed with autosolve
			noGuessMode: false, //To be removed with autosolve
		},
	];

	const initialConfigIndex = Math.max(
		0,
		difficulties.findIndex((dif) => {
			return (
				dif.height * dif.width === initialConfig.size &&
				dif.mineCount === initialConfig.mineCount
			);
		}),
	);
	return (
		<div>
			<Carousel
				title="Select a difficulty"
				pages={difficulties.map((dif, i) => (
					<DifficultyDisplay
						key={i}
						config={dif}
					/>
				))}
				startingIndex={initialConfigIndex}
			/>
		</div>
	);
};

export default ConfigSelector;
