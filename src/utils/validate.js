import { EMAIL_REGEX } from "../constants";

function validateEmail(email) {
  if (email.trim() === "") {
    return "Email is required";
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return "Email is not valid";
  }

  return "";
}

function validatePassword(password, isStrict = true) {
  if (password.trim() === "") {
    return "Password is required";
  }

  if (password.trim().length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.trim().length > 14) {
    return "Password must be less than 14 characters";
  }

  if (!isStrict) {
    return "";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return "";
}

function validateFullName(fullName) {
  if (fullName.trim() === "") {
    return "Full name is required";
  }

  return "";
}

function validateUsername(username) {
  if (username.trim() === "") {
    return "Username is required";
  }

  return "";
}

function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "Password and confirm password does not match";
  }

  return "";
}

export {
  validateFullName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
};
