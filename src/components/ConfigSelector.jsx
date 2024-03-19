import React from "react";
import Carousel from "./Carousel";
import DifficultyDisplay from "./DifficultyDisplay";

const ConfigSelector = ({ setConfig }) => {
	const standardDifficulties = [
		{
			height: 8,
			width: 8,
			mineCount: 10,
			difName: "Easy",
		},
		{
			height: 16,
			width: 16,
			mineCount: 40,
			difName: "Medium",
		},
		{
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
