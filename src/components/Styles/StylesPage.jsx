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

const LeaderBoardPage = () => {
	// Utility
	const [url, setUrl] = useState("");

	async function processImage(e) {
        console.log("start processing image")
		const file = e.target.files[0];

		if (!file) return;

		setUrl(await imageToDataURL(file));

		localStorage.setItem("userIcon", url);
	}

	async function imageToDataURL(file, size = 256) {
		const bitmap = await createImageBitmap(file);


		const scale = Math.min(size / bitmap.width, size / bitmap.height, 1);

		const width = Math.round(bitmap.width * scale);
		const height = Math.round(bitmap.height * scale);

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(bitmap, 0, 0, width, height);

		return canvas.toDataURL("image/png", 0.8);
	}

	onload = function () {
		const savedIcon = localStorage.getItem("userIcon");

		if (savedIcon) {
			userIcon.src = savedIcon;
		}
	};

	useEffect(onload, []);

	return (
		<div className="leaderboard-wrapper">
			<div>
				<Link className="button" to={`/`}>
					<ArrowLeft />
					{" Go Back"}
				</Link>
				<h1>Styles</h1>
				<div>
					<input
						type="file"
						id="iconPicker"
						accept="image/*"
						onChange={processImage}
					></input>

					<img
						src={url}
						id="userIcon"
						alt="Your icon"
						style={{
							// width: "var(--cell-size)",
							aspectRatio: 1,
							objectFit: "cover",
						}}
					></img>
				</div>
				<div>{url}</div>
			</div>
		</div>
	);
};

export default LeaderBoardPage;
