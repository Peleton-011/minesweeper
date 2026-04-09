import { deleteScore } from "../utils/leaderboard";
const Score = ({ score }) => {
	return (
		<div className="score">
			<span className="date">{score.date}</span>
			<span className="time">{score.time}</span>
            <button onClick={() => deleteScore(score.id)}>X</button>
		</div>
	);
};

export default Score;
