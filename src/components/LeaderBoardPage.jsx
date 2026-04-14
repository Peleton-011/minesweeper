import { useEffect, useState } from "react";

import "./LeaderBoard.css";

import { useParams } from "react-router-dom";
import {
	getDifficultyNameFromConfig,
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
		lives: Number(lives),
	};
	const [scores, setScores] = useState([]);

	const title = getDifficultyNameFromConfig({ ...config });

	const fetchScores = () => {
		fetchScoresByConfig(config).then((scs) => {
			setScores(scs);
			console.log(scs);
		});
	};

	useEffect(() => {
		fetchScores();
	}, []);

	return (
		<>
			<div className="leaderboard-title">
				<h2>{title}</h2>
					<Link to="/" onClick={() => {console.log("Naviger")}}>
						{"<--"}
					</Link>
			</div>
			<div onClick={() => fetchScores()}>
				<LeaderBoard scoreList={scores} />
			</div>
		</>
	);
};

export default LeaderBoardPage;
