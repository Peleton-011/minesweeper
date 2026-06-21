export type Difficulty = {
	height: number;
	width: number;
	mineCount: number;
	lives: number;
    size?: number;
	difName?: string;
	autoSolveMode?: boolean;
	noGuessMode?: boolean;
	winStateCheck?: string;
	startZone?: number;
};

// TODO: Implement the actual winstatecheck names

export const baseDifficulty = {
	winStateCheck: "revealAll",
	startZone: 3,
	lives: 3,
	autoSolveMode: false,
	noGuessMode: false,
};
export const standardDifficulties: Difficulty[] = [
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

export const getDifficultyName = (difficulty: Difficulty) => {
	const mode = difficulty.lives === 1 ? "Perfect" : "Arcade";
	let difficultyName = "";
	// for (let [key, val] of Object.entries(config)) {
	// 	console.log(key, typeof val);
	// }
	standardDifficulties.forEach((dif) => {
		const size = dif.width * dif.height;

		if (size === difficulty.size && dif.mineCount === difficulty.mineCount) {
			difficultyName += dif.difName;
		}
	});

	if (difficultyName.length === 0) difficultyName += "Custom";
	return mode + " " + difficultyName;
};

const basePlusCustom = [
	...standardDifficulties,
	{
		...baseDifficulty,
		height: 7,
		width: 7,
		mineCount: 23,
		// This will be the custom difficulty
		difName: "Custom",
	},
];

const baseCustomArcadePerfect = [];

basePlusCustom.forEach((dif) => {
	baseCustomArcadePerfect.push(dif);
	baseCustomArcadePerfect.push({ ...dif, lives: 1 });
});

export const allDifficulties = baseCustomArcadePerfect.map((dif) => ({
	...dif,
	difName: getDifficultyName({
		...dif,
		size: dif.width * dif.height,
		mines: dif.mineCount,
	}),
}));

export const getDifficultyFromConfig = (config: Difficulty) => {
	const dif = allDifficulties.find((dif) => {
		return (
			dif.width === config.width &&
			dif.height === config.height &&
			dif.mineCount === config.mineCount &&
			dif.lives === config.lives
		);
	});
	return dif;
};

export const getNextDifficultyFromConfig = (config: any) => {
	const all = allDifficulties;
	const index = all.indexOf(getDifficultyFromConfig(config));
	if (index === all.length - 1) return all[0];
	return all[index + 1];
};

export const getPreviousDifficultyFromConfig = (config: any) => {
	const all = allDifficulties;
	const index = all.indexOf(getDifficultyFromConfig(config));
	if (index === 0) return all[all.length - 1];
	return all[index - 1];
};
