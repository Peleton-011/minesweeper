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
import useFriends from "../../hooks/useFriends.jsx";

const FriendshipItem = ({ friendship }) => {
	const [user, setUser] = useState({});
	const [authenticated, setAuthenticated] = useState(false);

	const [isSent, setIsSent] = useState(false);
	const isAccepted = friendship.accepted_at !== null;

	const supabase = useSupabase();
	const { fetchUsernameFromId } = useProfile();

	const [username, setUsername] = useState("");

	const {
		acceptedFriendships,
		sentFriendRequests,
		recievedFriendRequests,
		fetchFriends,
		addFriendRequest,
		acceptFriendRequest,
		deleteFriendship,
	} = useFriends();

	useEffect(() => {
		setIsSent(friendship.from_id === user.id);
	}, [user, friendship]);

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

	async function otherPartyUsername(friendship) {
		const username = await fetchUsernameFromId(
			isSent ? friendship.to_id : friendship.from_id,
		);

		setUsername(username);
	}

	useEffect(() => {
		fetchUser();
		otherPartyUsername(friendship);
	}, [isSent, friendship]);

	return (
		<div className="friendship-item">
			<div className="heading">
				<h3 className="friendship-name">{username} </h3>
				<span>
					{isAccepted
						? ""
						: isSent
						? " received your friend request"
						: " sent you a friend request"}
				</span>
			</div>
			<div className="footer">
				{!isAccepted && !isSent && (
					<button
						// className="stealth-button"
						onClick={() => acceptFriendRequest(friendship.from_id)}
					>
						V
					</button>
				)}

				<button
                // className="stealth-button"
					onClick={() =>
						deleteFriendship(
							isSent ? friendship.to_id : friendship.from_id,
						)
					}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default FriendshipItem;
