import React from "react";

function Button({ buttonText }) {
	return <input type="submit" className="signup__btn" value={buttonText} />;
}

export default Button;
