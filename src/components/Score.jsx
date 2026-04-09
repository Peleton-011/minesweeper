import { deleteScore } from "../utils/leaderboard";
import { getDateString, getTimeString } from "../utils/timeutils";

const Score = ({ score }) => {
	return (
		<div className="score">
			<span className="date">{getDateString(score.date)}</span>
			<span className="time">{getTimeString(score.time)}</span>
			<button onClick={() => deleteScore(score.id)}>X</button>
		</div>
	);
};

export default Score;
