const validation = (values) => {
	let errors = {};
	const emailRegex = /^\w+([\\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	const phoneRegex = /^\d{10}$/;
	if (!values.fullName) {
		errors.fullName = "Full name is required";
	}
	if (!values.userName) {
		errors.userName = "Username is required";
	}
	if (!values.email) {
		errors.email = "Email is required";
	} else if (!emailRegex.test(values.email)) {
		errors.email = "Email is invalid";
	}

	if (!values.password) {
		errors.password = "Password is required";
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = "Confirm password is required";
	} else if (values.password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}
	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Passwords must match";
	}
	if (!values.phoneNumber) {
		errors.phoneNumber = "Phone number is required";
	} else if (!phoneRegex.test(values.phoneNumber)) {
		errors.phoneNumber = "Phone number is invalid";
	}
	return errors;
};

export default validation;
