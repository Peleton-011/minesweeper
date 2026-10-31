import { getDateString, getTimeString } from "@/utils/timeutils";
import { getDifficultyName } from "@/utils/difficulties";

const Score = ({ score, deleteScore }) => {
	return (
		<div className="score">
			<div className="left">
				<span className="time">{getTimeString(score.time)}</span>
			</div>
			{score.userName ? (
				<div className="middle">{score.userName}</div>
			) : (
				""
			)}
			<div className>
				<span className="date right">{getDateString(score.date)}</span>
				{deleteScore ? (
					<button onClick={() => deleteScore(score.id)}>X</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Score;
