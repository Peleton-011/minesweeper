import React from "react";
import Carousel from "./Carousel";
import DifficultyDisplay from "./DifficultyDisplay";
import { standardDifficulties } from "../utils/difficulties";

const ConfigSelector = ({ setConfig, setIsGameStarted }) => {
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
