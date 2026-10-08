import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	LuArrowLeft as ArrowLeft,
	LuUserPen as EditUser,
	LuLogOut as LogOut,
	LuLogIn as LogIn,
	LuUserPlus as SignUp,
} from "@react-icons/lucide";

import { useParams } from "react-router-dom";
import {
	getDifficultyName,
	getNextDifficultyFromConfig,
	getPreviousDifficultyFromConfig,
} from "@/utils/difficulties";
import { Link } from "react-router-dom";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import { fetchScoresByDifficulty } from "@/utils/leaderboard";
import { useSupabase } from "../../context/SupabaseContext.jsx";

const LeaderBoardPage = () => {
	const [user, setUser] = useState({});
    const [authenticated, setAuthenticated] = useState(false);

	const supabase = useSupabase();

	function fetchUser() {
		supabase.auth.getSession().then(({ data, error }) => {
			// console.log(session);
			// console.log(user)
			if (data.session) {
				setUser(session.user);
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
			<div>
				<ul>
					{authenticated && (
						<li>
							<Link to="/profile">
								<EditUser /> Profile
							</Link>
						</li>
					)}
					{authenticated && (
						<li>
							<div onClick={() => supabase.auth.signOut() && fetchUser()}>
								<Link to="/settings">
									<LogOut /> Logout
								</Link>
							</div>
						</li>
					)}
					{!authenticated && (
						<li>
							<Link to="/login">
								<LogIn /> Login
							</Link>
						</li>
					)}
					{!authenticated && (
						<li>
							<Link to="/register">
								<SignUp /> Register
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default LeaderBoardPage;
