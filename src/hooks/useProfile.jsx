import { useSupabase } from "../context/SupabaseContext.jsx";
import { useEffect, useState } from "react";

function useProfile() {
	const supabase = useSupabase();

	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);

	const [updateUserError, setUpdateUserError] = useState(null);
	const [updateUsernameError, setUpdateUsernameError] = useState(null);

	const fetchSession = () => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setUser(session.user);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const fetchUser = async () => {
		supabase.auth
			.getUser()
			.then((res) => {
				setUser(res.data.user);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	async function updateUserName(username) {
		const { data, error } = await supabase
			.from("profiles")
			.update({ user_name: username })
			.eq("id", user.id);
		setUpdateUsernameError(error?.message || "");
	}
	async function updateUser({ email, password }) {
		const opts = {};
		if (email) opts.email = email;
		if (password) opts.password = password;

		const { data, error } = await supabase.auth.updateUser(opts);
		setUpdateUserError(error?.message || "");
	}

	async function updateProfile({ email, password, username }) {
		if (username) updateUserName(username);
		if (password || email) updateUser({ email, password });
	}

	async function fetchProfile() {
		if (!user) return fetchUser();
		const { data, error } = await supabase
			.from("profiles")
			.select("user_name", "id")
			.eq("id", user.id);
		setProfile({
			id: user.id,
			username: data[0].user_name,
			email: user.email,
		});
	}

	useEffect(() => {
		fetchUser().then(fetchProfile);
	}, []);
	return {
		updateProfile,
		user,
		updateUserError,
		updateUsernameError,
		profile,
		fetchProfile,
	};
}

export default useProfile;
