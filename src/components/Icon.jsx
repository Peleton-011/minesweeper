import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { useParams } from "react-router-dom";
import {
	getDifficultyName,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "@/utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import { fetchScoresByDifficulty } from "@/utils/leaderboard";

const Icon = ({iconUrl = "", iconChar = ""}) => {

    if (iconUrl[0] === '"') {
        iconUrl = iconUrl.substring(1, iconUrl.length - 1);
    } else if (iconUrl.substring(0, 4) === "url(") {
        iconUrl = iconUrl.substring(5, iconUrl.length - 2);
    }

    if (iconChar[0] === '"') {
        iconChar = iconChar.substring(1, iconChar.length - 1);
    }
    return (
		<>
			{iconUrl ? (
				<img
					src={iconUrl}
					alt={iconChar || "Icon"}
					style={{
						width: "var(--cell-size)",
						aspectRatio: 1,
						objectFit: "cover",
					}}
				></img>
			) : (
				<span>{iconChar}</span>
			)}
            {/* <div>{iconUrl}</div> */}
		</>
	);
};

export default Icon;
