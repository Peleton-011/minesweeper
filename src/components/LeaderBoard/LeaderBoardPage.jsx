import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	LuArrowLeft as ArrowLeft,
	LuGlobe as Globe,
} from "@react-icons/lucide";
import {
	User as User,
	UserGroup as Friends,
	Landmark as World, //Crown, Award, Globe, Earth
	Calendar1,
	CalendarDays as CalendarMonth,
	Calendars as CalendarYear,
	Crown as CalendarEver,
} from "lucide-react";

import Calendar7 from "../Icons/Calendar7.jsx";

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
import useProfile from "../../hooks/useProfile.jsx";
import Popover from "./Popover.jsx";

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

	const { user } = useProfile();
	// console.log(users)
	const {
		scores: onlineScores,
		fetchScores: fetchOnlineScores,
		addScore: addOnlineScore,
		deleteScore: deleteOnlineScore,
	} = useLeaderBoards();
	const [scores, setScores] = useState([]);

	const title = getDifficultyName({ ...config });

	const nextDifficulty = getNextDifficultyFromConfig({ ...config });
	const prevDifficulty = getPreviousDifficultyFromConfig({ ...config });

	const [mode, setMode] = useState("own"); //own, friends, world

	const fetchScores = () => {
		fetchScoresByDifficulty(config).then((scs) => {
			setScores(scs);
		});
		fetchOnlineScores(config);
		// fetchOnlineScoresByDifficulty(config).then((scs) => {
		//     setScoresOnline(scs);
		// });
	};

	useEffect(() => {
		fetchScores();
	}, [width, height, mines, lives]);

	const scoresOnline = onlineScores.map((s) => {
		return {
			id: s.id,
			time: s.time_ms,
			date: s.date_ms,
			user: s.user_id,
			userName: s.profiles.user_name,
		};
	});

	const getSelectedLeaderboard = (mode) => {
		if (mode === "own") {
			return (
				<LeaderBoard
					scoreList={scores}
					deleteScore={(id) =>
						deleteScore(id).then(() => fetchScores())
					}
					isOffline={true}
				/>
			);
		} else if (mode === "world") {
			return (
				<LeaderBoard
					scoreList={scoresOnline}
					deleteScore={(id) =>
						deleteOnlineScore(id).then(() =>
							fetchOnlineScores(config),
						)
					}
					isOffline={false}
				/>
			);
		}
	};

	const timeSelectOptions = [
		{
			component: Calendar1,
			value: "day",
			onSelect: () => console.log("day"),
		},
		{
			component: Calendar7,
			value: "week",
			onSelect: () => console.log("week"),
		},
		{
			component: CalendarMonth,
			value: "month",
			onSelect: () => console.log("month"),
		},
		{
			component: CalendarYear,
			value: "year",
			onSelect: () => console.log("year"),
		},
		{
			component: CalendarEver,
			value: "ever",
			onSelect: () => console.log("ever"),
		},
	];

	return (
		<div className="leaderboard-wrapper">
			<div className="pill-buttons top">
				<button
					className={"own " + (mode === "own" ? "active" : "")}
					onClick={() => setMode("own")}
				>
					<User />
					{mode === "own" ? <span>My Times</span> : ""}
				</button>
				{/* <button
					className={
						"friends " + (mode === "friends" ? "active" : "")
					}
					onClick={() => setMode("friends")}
				>
					<Friends />{mode === "friends" ? (<span>Friends</span>) : ""}
				</button>  */}
				<button
					className={"world " + (mode === "world" ? "active" : "")}
					onClick={() => setMode("world")}
				>
					<World />
					{mode === "world" ? <span>Hall of Fame</span> : ""}
				</button>
			</div>
			<div className="popover-position">
				<Popover elems={timeSelectOptions} />
			</div>
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
			<div>
				{getSelectedLeaderboard(mode)}
				{/* <h3>
					On the cloud <Globe />{" "}
				</h3>
				<LeaderBoard
					scoreList={scoresOnline}
					deleteScore={(id) =>
						deleteOnlineScore(id).then(() =>
							fetchOnlineScores(config),
						)
					}
					isOffline={false}
				/> */}
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
