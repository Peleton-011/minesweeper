import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext.jsx";
import useProfile from "../../hooks/useProfile.jsx";

const ProfilePage = () => {
	/*

    TO DO:

    - Input verification (password requirements, passwords match...)
    - Add feedback on the verification
    - Add profiles (for username and such)
    */

	const {
		updateProfile,
		user,
		updateUserError,
		updateUsernameError,
		profile,
		fetchProfile,
	} = useProfile();

	const supabase = useSupabase();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [profileEditError, setProfileEditError] = useState("");

	useEffect(() => {
		function handleProfileChange() {
			if (!profile) return fetchProfile();

			profile.username && setUsername(profile.username);
			document.querySelector("#username").value = profile.username;

			setEmail(profile.email);
			document.querySelector("#email").value = profile.email;
		}

		handleProfileChange();
	}, [profile, user]);

	async function checkUsername(username, userId) {
		let error = "";
		const { data, error: errorObj } = await supabase
			.from("profiles")
			.select("user_name", "id")
			.eq("user_name", username);
		error = errorObj?.message || "";
		if (!username.length) {
			error = "Please enter a username";
		}
		if (data.length > 0 && data[0].id !== userId) {
			error = "Username already taken";
		}

		return error;
	}

	async function checkEmail(email, userId) {
		let error = "";
		const { data, error: errorObj } = await supabase
			.from("profiles")
			.select("email", "id")
			.eq("email", email);
		error = errorObj.message;

		if (!email.length) {
			error = "Please enter an email";
		}
		if (data.length > 0 && userId !== data[0].id) {
			error = "Email already taken";
		}

		return error;
	}

	function checkPassword(password) {
		if (password.length < 8) {
			return "Password must be at least 8 characters long";
		}
		return "";
	}

	function checkConfirmPassword(password, confirmPassword) {
		if (password !== confirmPassword) {
			return "Passwords do not match";
		}
		return "";
	}

	function handleSubmit(e) {
		e.preventDefault();
		updateProfile({ email, password, username }).then(() => {
			if (updateUserError) {
				setProfileEditError(updateUserError.message);
			} else if (updateUsernameError) {
				setProfileEditError(updateUsernameError.message);
			} else {
				navigate("/settings");
			}
		});
	}

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<fieldset>
				<legend>Edit Profile</legend>
				<label htmlFor="username">
					<span>Username </span>
					<input
						type="text"
						id="username"
						name="username"
                        placeholder="Your new username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						onBlur={(e) => {
							checkUsername(e.target.value, user.id).then(
								(error) => {
									setUsernameError(error);
								},
							);
						}}
					/>
				</label>
				{usernameError ? (
					<span className="error">Error: {usernameError}</span>
				) : (
					""
				)}
				<label htmlFor="email">
					<span>Email </span>
					<input
						type="text"
						id="email"
						name="email"
                        placeholder="Your new email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							checkEmail(e.target.value, user.id).then(
								(error) => {
									setEmailError(error);
								},
							);
						}}
					/>
				</label>
				{emailError && <p className="error">Error: {emailError}</p>}
				<label htmlFor="password">
					<span>New Password (optional)</span>
					<input
						type="password"
						id="password"
						name="password"
                        placeholder="******"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						onBlur={(e) => {
							setPasswordError(checkPassword(e.target.value));
						}}
					/>
				</label>
				{passwordError && (
					<p className="error">Error: {passwordError}</p>
				)}
				<label htmlFor="confirmPassword">
					<span>Confirm Password </span>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
                        placeholder="******"
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
						onBlur={(e) => {
							setConfirmPasswordError(
								checkConfirmPassword(password, e.target.value),
							);
						}}
					/>
				</label>
				{confirmPasswordError && (
					<p className="error">Error: {confirmPasswordError}</p>
				)}
				<div className="buttons">
					<button type="submit">Save changes</button>
					<Link className="button small" to="/settings">
						<ArrowLeft /> Cancel
					</Link>
				</div>
				{profileEditError && (
					<p className="error">Error: {profileEditError}</p>
				)}
			</fieldset>
		</form>
	);
};

export default ProfilePage;
