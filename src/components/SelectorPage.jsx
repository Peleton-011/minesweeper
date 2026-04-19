import GameHandler from "@/components/GameHandler";
import ConfigSelector from "@/components/Carousel/ConfigSelector";
import { useState, useEffect, useRef } from "react";
import "@/components/Game.css";
import { getPlayTimeString } from "@/utils/timeutils";
import { addScore, fetchScores } from "@/utils/leaderboard";
import { useParams } from "react-router-dom";

function SelectorPage() {

	const { width, height, mines, lives } = useParams();

	const config = {
		size: Number(width) * Number(height),
		width: Number(width),
		height: Number(height),
		mineCount: Number(mines),
		lives: Number(lives),
	};

	return (
		<>
			<ConfigSelector
				initialConfig={config}
			/>
		</>
	);
}

export default SelectorPage;
