import React from "react";
import Button from "./button";
function SignUp() {
	const submit = (e) => {
		e.preventDefault();
		console.log("submit");
	}
	return (
		<div className="signup">
			<div className="signup__wrapper">
				<h1 className="signup__title">Join us</h1>
				<form className="signup__form">
					<input
						className="signup__form--name"
						placeholder="Full name"
						autoComplete="none"
					></input>
					<input
						className="signup__form-username"
						placeholder="Username"
					></input>
					<input
						type="email"
						className="signup__form-email"
						placeholder="Email"
						autoComplete="none"
						required
					></input>
					<input
						type="password"
						className="signup__form-password"
						placeholder="Password"
						autoComplete="none"
						required
					></input>
					<input
						type="password"
						className="signup__form-confirm-password"
						placeholder="Confirm password"
						required
						autoComplete="none"
					></input>
					<input
						type="tel"
						className="signup__form-phone-number"
						placeholder="Phone number"
						required
						autoComplete="none"
					></input>
					<Button buttonText={"Create New Account"} submit={submit} />
				</form>
			</div>
		</div>
	);
}

export default SignUp;
