export const baseDifficulty = {
	winStateCheck: "revealAll",
	startZone: 3,
	lives: 3,
	autoSolveMode: false,
	noGuessMode: false,
};
export const standardDifficulties = [
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

export const getDifficultyNameFromConfig = (config) => {
	const mode = config.lives === 1 ? "Perfect" : "Arcade";
	let difficulty = "";
	standardDifficulties.forEach((dif) => {
		const size = dif.width * dif.height;

		if (size === config.size && dif.mineCount === config.mines) {
			difficulty += dif.difName;
		}
	});

	if (difficulty.length === 0) difficulty += "Custom";
	return mode + " " + difficulty;
};
