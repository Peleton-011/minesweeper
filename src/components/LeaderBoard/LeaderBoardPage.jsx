import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	LuArrowLeft as ArrowLeft,
	LuGlobe as Globe,
} from "@react-icons/lucide";

import { useParams } from "react-router-dom";
import {
	getDifficultyName,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "@/utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import { fetchScoresByDifficulty, deleteScore } from "@/utils/leaderboard";
import useLeaderBoards from "../../hooks/useLeaderBoards.jsx";

const LeaderBoardPage = () => {
	const { width, height, mines, lives } = useParams();
	const config = {
		size: Number(width) * Number(height),
		width: Number(width),
		height: Number(height),
		mines: Number(mines),
		mineCount: Number(mines),
		lives: Number(lives),
	};
	const {
		scores: onlineScores,
		fetchScores: fetchOnlineScores,
		addScore: addOnlineScore,
		deleteScore: deleteOnlineScore,
	} = useLeaderBoards();
	const [scores, setScores] = useState([]);
	const [scoresOnline, setScoresOnline] = useState([]);

	const title = getDifficultyName({ ...config });

	const nextDifficulty = getNextDifficultyFromConfig({ ...config });
	const prevDifficulty = getPreviousDifficultyFromConfig({ ...config });

	const fetchScores = () => {
		fetchScoresByDifficulty(config).then((scs) => {
			setScores(scs);
		});
		// fetchOnlineScoresByDifficulty(config).then((scs) => {
		//     setScoresOnline(scs);
		// });
	};

	useEffect(() => {
		fetchScores();
		fetchOnlineScores(config);
	}, [width, height, mines, lives]);

	useEffect(() => {
		setScoresOnline(
			onlineScores.map((s) => {
				return {
					id: s.id,
					time: s.time_ms,
					date: s.date_ms,
					user: s.user_id,
				};
			}),
		);
	}, [onlineScores]);
	return (
		<div className="leaderboard-wrapper">
			<div className="leaderboard-heading">
				<Link
					to={`/scores/${prevDifficulty.width}/${prevDifficulty.height}/${prevDifficulty.mineCount}/${prevDifficulty.lives}`}
					onClick={() => {
						// prevSlide();
						// leftButtonToggle();
					}}
					className={
						"prev btn leaderboard" /*+ (leftButtonAnimation ? "active" : "")*/
					}
				></Link>

				<div className="leaderboard-title">
					<h2>{title}</h2>
				</div>

				<Link
					to={`/scores/${nextDifficulty.width}/${nextDifficulty.height}/${nextDifficulty.mineCount}/${nextDifficulty.lives}`}
					onClick={() => {
						// nextSlide();
						// rightButtonToggle();
					}}
					className={
						"next btn leaderboard" /*+ (rightButtonAnimation ? "active" : "")*/
					}
				></Link>
			</div>
			<div onClick={() => fetchScores()}>
				<LeaderBoard scoreList={scores} deleteScore={() => deleteScore() && fetchScores()} />
				<h3>
					On the cloud <Globe />{" "}
				</h3>
				<LeaderBoard
					scoreList={scoresOnline}
					deleteScore={() => deleteOnlineScore() && fetchOnlineScores()}
				/>
			</div>
			<Link
				className="button"
				to={`/${width}/${height}/${mines}/${lives}`}
			>
				<ArrowLeft />
				{" Go Back"}
			</Link>
		</div>
	);
};

export default LeaderBoardPage;
