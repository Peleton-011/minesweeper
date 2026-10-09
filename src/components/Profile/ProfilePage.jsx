import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { Link } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext.jsx";

const ProfilePage = () => {
	/*

    TO DO:

    - Input verification (password requirements, passwords match...)
    - Add feedback on the verification
    - Add profiles (for username and such)
    */

	const supabase = useSupabase();
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setSession(session);
			})
			.catch((error) => {
				console.error(error);
			});
	});

	async function checkUsername(username, userId) {
		let error = "";
		const { data, error: errorObj } = await supabase
			.from("profiles")
			.select("user_name", "user_id")
			.eq("user_name", username);
		error = errorObj.message;
		if (!username.length) {
			error = "Please enter a username";
		}
		if (data.length > 0 && data[0].user_id !== userId) {
			error = "Username already taken";
		}

		return error;
	}

	async function checkEmail(email, userId) {
		let error = "";
		const { data, error: errorObj } = await supabase
			.from("profiles")
			.select("email", "user_id")
			.eq("email", email);
		error = errorObj.message;

		if (!email.length) {
			error = "Please enter an email";
		}
		if (data.length > 0 && userId !== data[0].user_id) {
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

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		signUpNewUser({ email, password }).then(({ data, error }) => {
			console.log(data);
			console.log(error);
		});
	}

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<fieldset>
				<legend>Sign Up</legend>
				<label htmlFor="username">
					<span>Username </span>
					<input
						type="text"
						id="username"
						name="username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						onBlur={(e) => {
							checkUsername(e.target.value, session.user.id).then(
								(error) => {
									setUsernameError(error);
								}
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
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						onBlur={(e) => {
							checkEmail(e.target.value, session.user.id).then(
								(error) => {
									setEmailError(error);
								}
							);
						}}
					/>
				</label>
				<label htmlFor="password">
					<span>New Password (optional)</span>
					<input
						type="password"
						id="password"
						name="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						onBlur={(e) => {
							setPasswordError(checkPassword(e.target.value));
						}}
					/>
				</label>
				<label htmlFor="confirmPassword">
					<span>Confirm Password </span>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
						onBlur={(e) => {
							setConfirmPasswordError(
								checkConfirmPassword(password, e.target.value)
							);
						}}
					/>
				</label>
				<div className="buttons">
					<button type="submit">Sign Up</button>
					<Link className="button small" to="/">
						<ArrowLeft /> Cancel
					</Link>
				</div>
				<span className="subtle">
					Already have an account?<Link to="/login"> Log In</Link>
				</span>
			</fieldset>
		</form>
	);
};

export default ProfilePage;
