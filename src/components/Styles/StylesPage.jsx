import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft} from "@react-icons/lucide";

import { useParams } from "react-router-dom";
import {
	getDifficultyName,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "@/utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import { fetchScoresByDifficulty } from "@/utils/leaderboard";

const LeaderBoardPage = () => {
	

	return (
		<div className="leaderboard-wrapper">
            <div>

			<Link className="button" to={`/`}><ArrowLeft />{" Go Back"}</Link>
            <h1>Styles</h1>
            </div>
		</div>
	);
};

export default LeaderBoardPage;
