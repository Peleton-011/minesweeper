import React from "react";
import Carousel from "./Carousel";
import DifficultyDisplay from "./DifficultyDisplay";

const ConfigSelector = () => {
	const standardDifficulties = [
		{
			height: 16,
			width: 30,
			mineCount: 99,
			difName: "Hard",
		},
		{
			height: 16,
			width: 16,
			mineCount: 40,
			difName: "Medium",
		},
		{
			height: 8,
			width: 8,
			mineCount: 10,
			difName: "Easy",
		},
	];

	return (
		<div>
			<h2>Config Selector</h2>
			<Carousel
				pages={standardDifficulties.map((dif, i) => (
					<DifficultyDisplay
						key={i}
						config={dif}
						onSubmit={() => {}}
					/>
				))}
			/>
		</div>
	);
};

export default ConfigSelector;
