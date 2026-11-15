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
		if (!user || !username) return;
		// Get recipient id

		const { data: friendData, error: friendError } = await supabase
			.from("profiles")
			.select("user_name, id")
			.eq("user_name", username)
			.single();

		if (friendError) throw friendError;
		if (friendData.length === 0) throw new Error("User not found");

		const recipientId = friendData.id;

		const newFriendship = {
			from_id: user.id,
			to_id: recipientId,
		};

		// Push new one
		const { data, error } = await supabase
			.from("friendships")
			.insert(newFriendship);
		if (error) throw error;

		if (data.length) {
			setRawFriendships([
				...rawFriendships,
				{ ...newFriendship, createdAt: Date.now(), acceptedAt: null },
			]);
		}

		return data;
	};

	const acceptFriendRequest = async (sender) => {
		const { data, error } = await supabase
			.from("friendships")
			.update({created_at: Date.now()})
			.eq("from_id", sender)
			.eq("to_id", user.id);

		if (error) throw error;

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
		addFriendRequest,
		// deleteScore,
	};
}

export default useFriends;
