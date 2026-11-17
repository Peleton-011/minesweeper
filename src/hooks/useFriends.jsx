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
	const [sentFriendRequests, setSentFriendRequests] = useState([]);
	const [recievedFriendRequests, setRecievedFriendRequests] = useState([]);
	const [friendsIdList, setFriendsIdList] = useState([]);

	const { user } = useProfile();

	useEffect(() => {
		fetchFriends();
		// .then(() => console.log(rawFriendships));
	}, [user]);

	useEffect(() => {
		setAcceptedFriendships(
			rawFriendships.filter(
				(friendship) => friendship.accepted_at !== null,
			),
		);
		setSentFriendRequests(
			rawFriendships.filter(
				(friendship) =>
					String(friendship.from_id) === String(user.id) &&
					friendship.accepted_at === null,
			),
		);
		setRecievedFriendRequests(
			rawFriendships.filter(
				(friendship) =>
					String(friendship.to_id) === String(user.id) &&
					friendship.accepted_at === null,
			),
		);
	}, [rawFriendships]);

	useEffect(() => {
		setFriendsIdList(
			acceptedFriendships.map((friendship) =>
				String(friendship.from_id) === String(user.id)
					? String(friendship.to_id)
					: String(friendship.from_id),
			),
		);
	}, [acceptedFriendships]);

	const fetchFriends = async () => {
		if (!user) return;
		const { data, error } = await supabase
			.from("friendships")
			.select("from_id, to_id, created_at, accepted_at")
			.or("to_id.eq." + user.id + ", from_id.eq." + user.id);
		if (error) throw error;

		setRawFriendships(data || []);

		return data;
	};

	const addFriendRequest = async (friend) => {
		if (!user || !friend) return;
		// Get recipient id

		const { data: friendData, error: friendError } = await supabase
			.from("profiles")
			.select(" id")
			.eq("id", friend)
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
		if (error) {
			throw error;
		} else {
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
			.update({ accepted_at: new Date().toISOString() })
			.eq("from_id", sender)
			.eq("to_id", user.id);

		if (error) throw error;

		fetchFriends();

		return data;
	};

	const deleteFriendship = async (id) => {
		if (!user) return;
		const { data, error } = await supabase
			.from("friendships")
			.delete()
			.or("to_id.eq." + user.id + ", from_id.eq." + user.id);
		if (error) throw error;

		setRawFriendships(
			rawFriendships.filter(
				(friendship) =>
					(String(friendship.from_id) === String(id) &&
						String(friendship.to_id) === String(user.id)) ||
					(String(friendship.from_id) === String(user.id) &&
						String(friendship.to_id) === String(id)),
			),
		);

		return data;
	};

	return {
        friendsIdList,
		acceptedFriendships,
		sentFriendRequests,
		recievedFriendRequests,
		fetchFriends,
		addFriendRequest,
		acceptFriendRequest,
		deleteFriendship,
	};
}

export default useFriends;
