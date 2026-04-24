import { Preferences } from "@capacitor/preferences";
import { Difficulty } from "@/utils/difficulties";

export type Score = {
	id: number;
	time: number;
	date: number;
	size: number;
	mineCount: number;
	lives: number;
}

const saveScore = async (newScore: Score): Promise<void> => {
	const { value } = await Preferences.get({ key: "leaderboard" });

	let scores = value ? JSON.parse(value) : [];

	scores.push(newScore);

	//Sort times and keep teh best
	scores.sort((a: Score, b: Score) => a.time - b.time);

	// scores = scores.slice(0, 10);

	await Preferences.set({
		key: "leaderboard",
		value: JSON.stringify(scores),
	});
};

export const fetchScores = async (): Promise<Score[]> => {
	const { value } = await Preferences.get({ key: "leaderboard" });
	return value ? JSON.parse(value) : [];
};

export const deleteScore = async (id: number): Promise<void> => {
	const { value } = await Preferences.get({ key: "leaderboard" });
	const scores = value ? JSON.parse(value) : [];
	const newScores = scores.filter((score: Score) => score.id !== id);
	await Preferences.set({
		key: "leaderboard",
		value: JSON.stringify(newScores),
	});
};

export const addScore = (time: number, difficulty: Difficulty): void => {
	// console.log(gameConfig);
	const data = {
		id: Date.now(),
		time,
		date: new Date().getTime(),
		size: difficulty.width * difficulty.height,
		mineCount: difficulty.mineCount,
		lives: difficulty.lives,
	};

	saveScore(data);
};

export const fetchScoresByDifficulty = async (
	difficulty: Difficulty,
): Promise<Score[]> => {
	const scores = await fetchScores();

	return scores.filter(
		(score) =>
			score.size === difficulty.width * difficulty.height &&
			score.mineCount === difficulty.mineCount &&
			score.lives === difficulty.lives,
	);
};
