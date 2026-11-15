import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	ArrowLeft as ArrowLeft,
	UserPen as EditUser,
	LogOut as LogOut,
	LogIn as LogIn,
	UserPlus as SignUp,
	UserGroup as Friends,
} from "lucide-react";

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
import useProfile from "../../hooks/useProfile.jsx";


const FriendshipList = ({ elems, title, emptyText }) => {
	const [user, setUser] = useState({});
	const [authenticated, setAuthenticated] = useState(false);

	const supabase = useSupabase();
	const navigate = useNavigate();

	const { fetchProfileFromUsername, fetchProfileError } = useProfile();

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
		<div className="friendships-wrapper">
			<div className="friendships-heading">
				<div className="friendships-title">
					<h3>{title}</h3>
				</div>
			</div>
			<hr />
			{elems.length > 0 ? (
				elems.map((e, i) => {
					const isSent = e.from_id === user.id;
					const isRecieved = e.to_id === user.id;
					const isAccepted = e.accepted_at !== null;

					return (
						<div className="friendship-item" key={i}>
							{JSON.stringify(e, null, 2)}
						</div>
					);
				})
			) : (
				<h4 className="empty-text">{emptyText}</h4>
			)}
		</div>
	);
};

export default FriendshipList;
