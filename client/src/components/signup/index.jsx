import React, { useState } from "react";
import validation from "./signUpValidation";
function SignUp() {
	const [values, setValues] = useState({
		fullName: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
	});
	const [errors, setErrors] = useState({});
	const handleFormSubmit = (e) => {
		e.preventDefault();
		setErrors(validation(values));
	};
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div className="signup">
			<div className="signup__wrapper">
				<h1 className="signup__title">Join us</h1>
				<form className="signup__form">
					<input
						className="signup__form--name"
						placeholder="Full name"
						autoComplete="none"
						name="fullName"
						value={values.fullName}
						onChange={handleChange}
					></input>
					{errors.fullName && <p className="error">{errors.fullName}</p>}
					<input
						className="signup__form-username"
						placeholder="Username"
						autoComplete="none"
						name="userName"
						value={values.userName}
						onChange={handleChange}
					></input>
					{errors.userName && <p className="error">{errors.userName}</p>}
					<input
						type="text"
						className="signup__form-email"
						placeholder="Email"
						autoComplete="none"
						name="email"
						// required
						value={values.email}
						onChange={handleChange}
					></input>
					{errors.email && <p className="error">{errors.email}</p>}
					<input
						type="password"
						className="signup__form-password"
						placeholder="Password"
						autoComplete="none"
						name="password"
						// required
						value={values.password}
						onChange={handleChange}
					></input>
					{errors.password && <p className="error">{errors.password}</p>}
					<input
						type="password"
						className="signup__form-confirm-password"
						placeholder="Confirm password"
						// required
						name="confirmPassword"
						autoComplete="none"
						value={values.confirmPassword}
						onChange={handleChange}
					></input>
					{errors.confirmPassword && (
						<p className="error">{errors.confirmPassword}</p>
					)}
					<input
						type="tel"
						className="signup__form-phone-number"
						placeholder="Phone number"
						// required
						name="phoneNumber"
						autoComplete="none"
						value={values.phoneNumber}
						onChange={handleChange}
					></input>
					{errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
					<button className="signup__btn" onClick={handleFormSubmit}>
						Create New Account
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
