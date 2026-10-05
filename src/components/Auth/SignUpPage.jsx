import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { Link } from "react-router-dom";

const SignUpPage = () => {
	return (
		<form className="auth-form">
			<fieldset>
				<legend>Sign Up</legend>
				<label htmlFor="username">
					<span>Username </span>
					<input type="text" id="username" name="username" />
				</label>
				<label htmlFor="email">
					<span>Email </span>
					<input type="text" id="email" name="email" />
				</label>
				<label htmlFor="password">
					<span>Password </span>
					<input type="password" id="password" name="password" />
				</label>
				<label htmlFor="confirmPassword">
					<span>Confirm Password </span>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
					/>
				</label>
				<div className="buttons">
					<button type="submit">Sign Up</button>
					<Link className="button small" to="/">
						<ArrowLeft /> Cancel
					</Link>
				</div>
				<span className="subtle">Already have an account?<Link to="/login">
					{" "} 
					Log In
				</Link></span>
				
			</fieldset>
		</form>
	);
};

export default SignUpPage;
