import React from "react";

function Button({ buttonText, submit }) {
	return (
		<input
			type="submit"
			className="signup__btn"
			value={buttonText}
			onClick={submit}
		/>
	);
}

export default Button;
