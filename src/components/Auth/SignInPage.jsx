import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft} from "@react-icons/lucide";

import { Link } from "react-router-dom";

const SignInPage = () => {

	return (
		<form className="auth-form">
			<fieldset>
				<legend>Sign In</legend>
				<label htmlFor="email">
					<span>Email </span>
					<input type="text" id="email" name="email" />
				</label>
				<label htmlFor="password">
					<span>Password </span>
					<input type="password" id="password" name="password" />
				</label>
				<div className="buttons">
					<button type="submit">Sign In</button>
					<Link className="button small" to="/">
						<ArrowLeft /> Cancel
					</Link>
				</div>
				<span className="subtle">Don't have an account?<Link to="/signup">
					{" "} 
					Sign Up
				</Link></span>
				
			</fieldset>
		</form>
	);
};

export default SignInPage;
