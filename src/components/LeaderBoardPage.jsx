import { useEffect, useState } from "react";

import "./LeaderBoardPage.css";

import { useParams } from "react-router-dom";
import {
	getDifficultyNameFromConfig,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "../utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import { fetchScoresByConfig } from "../utils/leaderboard";

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
	const [scores, setScores] = useState([]);

	const title = getDifficultyNameFromConfig({ ...config });

	const nextDifficulty = getNextDifficultyFromConfig({ ...config });
	const prevDifficulty = getPreviousDifficultyFromConfig({ ...config });

	const fetchScores = () => {
		fetchScoresByConfig(config).then((scs) => {
			setScores(scs);
		});
	};

	useEffect(() => {
		fetchScores();
	}, [width, height, mines, lives]);

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
				<LeaderBoard scoreList={scores} />
			</div>
			<Link className="backhome-btn" to={`/${width}/${height}/${mines}/${lives}`}>{"<-- Go Back"}</Link>
		</div>
	);
};

export default LeaderBoardPage;
