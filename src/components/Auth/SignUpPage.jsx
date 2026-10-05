import { useEffect, useState } from "react";

import "@/components/LeaderBoard/LeaderBoardPage.css";
import { LuArrowLeft as ArrowLeft } from "@react-icons/lucide";

import { Link } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext.jsx";

const SignUpPage = () => {

    /*

    TO DO:

    - Input verification (password requirements, passwords match...)
    - Add feedback on the verification
    - Add profiles (for username and such)
    */

    const supabase = useSupabase();
    
    async function signUpNewUser({email, password}) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://example.com/welcome',
        },
      })
      return {data, error}
    }
    

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        signUpNewUser({email, password}).then(({ data, error }) => {
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
					<input type="text" id="username" name="username" onChange={(e) => {setUsername(e.target.value)}} />
				</label>
				<label htmlFor="email">
					<span>Email </span>
					<input type="text" id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} />
				</label>
				<label htmlFor="password">
					<span>Password </span>
					<input type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />
				</label>
				<label htmlFor="confirmPassword">
					<span>Confirm Password </span>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
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
