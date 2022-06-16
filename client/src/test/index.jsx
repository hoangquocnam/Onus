import React, { useState } from "react";
import "../components";
import LoginForm from "../components/login";
import SignUp from "../components/signup";
function TestComponents() {
	return (
		<div className="signup-container">
			{/* <LoginForm /> */}
			<SignUp />
		</div>
	);
}

export default TestComponents;
