import { useEffect, useState } from "react";
import { fetchScores } from "../utils/leaderboard";
import Score from "./Score";

const LeaderBoard = () => {
	const [scores, setScores] = useState([]);

	useEffect(() => {
		fetchScores().then(setScores);
	}, []);

	return (
		<div onClick={() => fetchScores().then(setScores)}>
			<h1>Leaderboard</h1>
			{scores.map((score) => (
				<Score key={score.id} score={score} />
			))}
		</div>
	);
};

export default LeaderBoard;
