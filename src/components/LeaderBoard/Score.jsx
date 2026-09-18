import { deleteScore } from "@/utils/leaderboard";
import { getDateString, getTimeString } from "@/utils/timeutils";
import { getDifficultyName } from "@/utils/difficulties";

const Score = ({ score }) => {
	return (
		<div className="score">
			<div className="left">
				<span className="time">{getTimeString(score.time)}</span>
			</div>
			{/* <div className="middle">
                {getDifficultyName(score)}
                </div> */}
			<div className>
				<span className="date right">{getDateString(score.date)}</span>
				<button onClick={() => deleteScore(score.id)}>X</button>
			</div>
		</div>
	);
};

export default Score;
