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

export const fetchScores = async () => {
	const { value } = await Preferences.get({ key: "leaderboard" });
	return value ? JSON.parse(value) : [];
};

export const deleteScore = async (id) => {
    const { value } = await Preferences.get({ key: "leaderboard" });
    const scores = value ? JSON.parse(value) : [];
    const newScores = scores.filter((score) => score.id !== id);
    await Preferences.set({
        key: "leaderboard",
        value: JSON.stringify(newScores),
    });
}

export const addScore = (time, gameConfig) => {
	const data = {
        id: Date.now(),
		time,
		date: new Date().getTime(),
		size: gameConfig.width * gameConfig.height,
		mines: gameConfig.mineCount,
		lives: gameConfig.lives,
	};

	saveScore(data);
};
