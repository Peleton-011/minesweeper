import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext.jsx";

const SignInPage = () => {
	const supabase = useSupabase();
	const navigate = useNavigate();

	async function signIn({ email, password }) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		return { data, error };
	}

	async function checkEmail(email) {
		let error = "";

		if (!email.length) {
			error = "Please enter an email";
		}
		return { error };
	}

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [signInError, setSignInError] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		signIn({ email, password }).then(({ data, error }) => {
			if (error) {
				setSignInError(error.message);
			} else {
                navigate("/");
			}
		});
	}

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<fieldset>
				<legend>Sign In</legend>
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
							checkEmail(e.target.value).then(
								({ data, error }) => {
									if (error) {
										setEmailError(error);
									} else {
										setEmailError("");
									}
								}
							);
						}}
					/>
				</label>
                {emailError && <p className="error">Error: {emailError}</p>}
				<label htmlFor="password">
					<span>Password </span>
					<input
						type="password"
						id="password"
						name="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</label>
                {passwordError && <p className="error">Error: {passwordError}</p>}
				<div className="buttons">
					<button type="submit">Sign In</button>
					<Link className="button small" to="/">
						<ArrowLeft /> Cancel
					</Link>
				</div>
                {signInError && <p className="error">Error: {signInError}</p>}
				<span className="subtle">
					Don't have an account?<Link to="/signup"> Sign Up</Link>
				</span>
			</fieldset>
		</form>
	);
};

export default SignInPage;
