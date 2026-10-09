import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	LuArrowLeft as ArrowLeft,
	LuUserPen as EditUser,
	LuLogOut as LogOut,
	LuLogIn as LogIn,
	LuUserPlus as SignUp,
} from "@react-icons/lucide";

import { useNavigate, useParams } from "react-router-dom";
import {
	getDifficultyName,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "@/utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import { fetchScoresByDifficulty } from "@/utils/leaderboard";
import { useSupabase } from "../../context/SupabaseContext.jsx";

const ShopPage = () => {
	const [user, setUser] = useState({});
	const [authenticated, setAuthenticated] = useState(false);

	const supabase = useSupabase();
	const navigate = useNavigate();

	function fetchUser() {
		supabase.auth.getSession().then(({ data, error }) => {
			// console.log(session);
			// console.log(user)
			if (data.session) {
				setUser(data.session.user);
				setAuthenticated(true);
			} else {
				setUser(null);
				setAuthenticated(false);
			}
		});
	}

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<div className="leaderboard-wrapper">
			<div className="leaderboard-heading">
				<div className="leaderboard-title">
					<h2>Settings</h2>
				</div>
			</div>
			{authenticated && (
				<Link to="/profile" className="button stealth-button play">
					<EditUser /> Profile
				</Link>
			)}
			{authenticated && (
				<div
					className="button stealth-button play"
					onClick={async () => {
						await supabase.auth.signOut();
                        fetchUser();
						navigate("/settings");
					}}
				>
					<LogOut /> Logout
				</div>
			)}
			{!authenticated && (
				<Link to="/login" className="button stealth-button play">
					<LogIn /> Login
				</Link>
			)}
			{!authenticated && (
				<Link to="/register" className="button stealth-button play">
					<SignUp /> Register
				</Link>
			)}
			<h3 className="subtle">... more to come here soon!</h3>
			<Link className="button" to={`/`}>
				<ArrowLeft />
				{" Go Back"}
			</Link>
		</div>
	);
};

export default ShopPage;
