import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import {
	ArrowLeft as ArrowLeft,
	Search,
	UserPlus as AddFriend,
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
import FriendshipList from "./FriendshipList.jsx";

const ShopPage = () => {
	const [user, setUser] = useState({});
	const [authenticated, setAuthenticated] = useState(false);

	const [searchbarOpen, setSearchbarOpen] = useState(false);

	const supabase = useSupabase();
	const navigate = useNavigate();
	const { fetchProfileFromUsername, fetchProfileError } = useProfile();
	const [fetchProfileSuccess, setFetchProfileSuccess] = useState(false);
	const [searchedProfile, setSearchedProfile] = useState(null);

	const {
		acceptedFriendships,
		sentFriendRequests,
		recievedFriendRequests,
		fetchFriends,
		addFriendRequest,
		acceptFriendRequest,
		deleteFriendship,
	} = useFriends();

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

	function addFriend() {
		if (fetchProfileSuccess) {
			addFriendRequest(searchedProfile.id);
		}
	}

	useEffect(() => {
		fetchFriends();
		fetchUser();
	}, []);

	return (
		<div className="menu-wrapper">
			<div className="menu-heading">
				<div className="menu-title">
					<h2>Friendships </h2>
					<button
						className={searchbarOpen ? "" : "stealth-button "}
						onClick={() => setSearchbarOpen(!searchbarOpen)}
					>
						<Search />
					</button>
				</div>
			</div>

			{searchbarOpen && (
				<fieldset className="searchbar">
					<h4>Search for your friends</h4>
					<div className="searchbar-input">
						<input
							type="text"
							placeholder="Username"
							onChange={(e) =>
								fetchProfileFromUsername(e.target.value).then(
									(e) => {
										setSearchedProfile(e);
										setFetchProfileSuccess(!!e);
									},
								)
							}
						/>
						<button className="" onClick={addFriend}>
							<AddFriend />
						</button>
					</div>
					{fetchProfileError && (
						<p className="error">
							Error: {fetchProfileError.message}
						</p>
					)}
					{fetchProfileSuccess && (
						<p className="success">User found</p>
					)}
				</fieldset>
			)}
			{sentFriendRequests.length > 0 && (
				<FriendshipList
					elems={sentFriendRequests}
					title={"Outgoing friend requests"}
					emptyText={"No friend requests sent"}
				/>
			)}
			{recievedFriendRequests.length > 0 && (
				<FriendshipList
					elems={recievedFriendRequests}
					title={"Incoming friend requests"}
					emptyText={"No friend requests pending"}
				/>
			)}
			{acceptedFriendships.length > 0 ? (
				<FriendshipList
					elems={acceptedFriendships}
					title={"Current Friends"}
					emptyText={"No friends ...yet!"}
				/>
			) : (
				<h4 className="empty-text">No friends ...yet!</h4>
			)}

			<Link className="button" to={`/`}>
				<ArrowLeft />
				{" Go Back"}
			</Link>
		</div>
	);
};

export default ShopPage;
