import { deleteScore } from "@/utils/leaderboard";
import { getDateString, getTimeString } from "@/utils/timeutils";
import { getDifficultyName } from "@/utils/difficulties";

const Score = ({ score }) => {
	return (
		<div className="score">
			<div className="left">
				<span className="date">{getDateString(score.date)}</span>
			</div>
            <div className="middle">
                {getDifficultyName(score)}
            </div>
			<div className="right">
				<span className="time">{getTimeString(score.time)}</span>
				<button onClick={() => deleteScore(score.id)}>X</button>
			</div>
		</div>
	);
};

export default Score;
