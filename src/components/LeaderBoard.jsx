import { useEffect, useState } from "react";
import { fetchScores } from "../utils/leaderboard";
import Score from "./Score";

import { useParams } from "react-router-dom";

const LeaderBoard = () => {
	const { width, height, mines, lives } = useParams();
	const [scores, setScores] = useState([]);

	useEffect(() => {
		fetchScores().then((scs) => {
			let scores = scs;
			if (width && height && mines && lives) {
				scores = scores.filter((score) =>  (
						score.size === width * height &&
						score.mines === Number(mines) &&
						score.lives === Number(lives)
					));
			}

			return setScores(scores);
		});
	}, []);

	return (
		<div onClick={() => fetchScores().then(setScores)}>
			<h1>Leaderboard</h1>
			<ol>
				{scores.map((score) => (
					<li key={score.id}>
						<Score score={score} />
					</li>
				))}
			</ol>
		</div>
	);
};

export default LeaderBoard;
