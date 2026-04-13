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
	// for (let [key, val] of Object.entries(config)) {
	// 	console.log(key, typeof val);
	// }
	standardDifficulties.forEach((dif) => {
		const size = dif.width * dif.height;

		if (size === config.size && dif.mineCount === config.mines) {
			difficulty += dif.difName;
		}
	});

	if (difficulty.length === 0) difficulty += "Custom";
	return mode + " " + difficulty;
};

const basePlusCustom = [
	...standardDifficulties,
	{
		...baseDifficulty,
		height: 7,
		width: 7,
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
	difName: getDifficultyNameFromConfig({
		...dif,
		size: dif.width * dif.height,
		mines: dif.mineCount,
	}),
}));

export const getDifficultyFromConfig = (config) => {
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

export const getNextDifficultyFromConfig = (config) => {
    const all = allDifficulties;
    const index = all.indexOf(getDifficultyFromConfig(config));
    if (index === all.length - 1) return all[0];
    return all[index + 1];
}

export const getPreviousDifficultyFromConfig = (config) => {
    const all = allDifficulties;
    const index = all.indexOf(getDifficultyFromConfig(config));
    if (index === 0) return all[all.length - 1];
    return all[index - 1];
}