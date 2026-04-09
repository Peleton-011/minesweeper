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
			<ol>
				{scores.map((score) => (
					<li key={score.id}>
						<Score  score={score} />
					</li>
				))}
			</ol>
		</div>
	);
};

export default LeaderBoard;
