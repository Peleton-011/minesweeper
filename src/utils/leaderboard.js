import { Preferences } from "@capacitor/preferences";

const saveScore = async (newScore) => {
	const { value } = await Preferences.get({ key: "leaderboard" });

	let scores = value ? JSON.parse(value) : [];

	scores.push(newScore);

	//Sort times and keep teh best
	scores.sort((a, b) => a.time - b.time);

	// scores = scores.slice(0, 10);

	await Preferences.set({
		key: "leaderboard",
		value: JSON.stringify(scores),
	});
};

const loadScores = async () => {
	const { value } = await Preferences.get({ key: "leaderboard" });
	return value ? JSON.parse(value) : [];
};

export const addScore = (time, gameConfig) => {
	const data = {
		time,
		date: new Date().getTime(),
		size: gameConfig.width * gameConfig.height,
		mines: gameConfig.mineCount,
		lives: gameConfig.lives,
	};

	saveScore(data);
};

export const fetchScores = async () => {
    
	return await loadScores()
};
