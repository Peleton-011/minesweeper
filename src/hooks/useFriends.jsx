import { Preferences } from "@capacitor/preferences";
import { useSupabase } from "../context/SupabaseContext.jsx";
import { useEffect, useState } from "react";
import useProfile from "./useProfile.jsx";

/*
export type Friendship = {
    from_id: uuid;
    to_id: uuid;
    created_at: number;
    accepted_at: number;
}
    */

function useFriends() {
	const supabase = useSupabase();
	const [rawFriendships, setRawFriendships] = useState([]);
	const [acceptedFriendships, setAcceptedFriendships] = useState([]);
	const [friendRequests, setFriendRequests] = useState([]);

	const { user } = useProfile();

    useEffect(() => {
        fetchFriends().then(() => console.log(rawFriendships));
    }, [user]);

	const fetchFriends = async () => {
        if (!user) return;
		const { data, error } = await supabase
			.from("friendships")
			.select("from_id, to_id, created_at, accepted_at")
			.or("to_id.eq." + user.id, "from_id.eq." + user.id);
		if (error) throw error;

		setRawFriendships(data || []);

		return data;
	};

	const addFriendRequest = async (username) => {
		if (!user) return;
		// Normalize data
		const newScore = {
			date_ms: Date.now(),
			time_ms: time,
			user_id: user.id,

			size: difficulty.width * difficulty.height,
			mine_count: difficulty.mineCount,
			lives: difficulty.lives,
		};

		// Push new one
		const { data, error } = await supabase
			.from("highscores")
			.insert(newScore);
		if (error) throw error;

		if (data.length) {
			setScores([...scores, newScore]);
		}

		return data;
	};

	// const deleteScore = async (id) => {
	// 	const { data, error } = await supabase
	// 		.from("highscores")
	// 		.delete()
	// 		.eq("id", id)
	// 		.select("id");

	// 	if (error) throw error;

	// 	if (data?.length) {
	// 		setScores((current) =>
	// 			current.filter((score) => String(score.id) !== String(id)),
	// 		);
	// 	}

	// 	return data;
	// };

	return {
		acceptedFriendships,
		friendRequests,
		fetchFriends,
		// addScore,
		// deleteScore,
	};
}

export default useFriends;
