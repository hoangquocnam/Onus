import { emailRegex } from "../constants";

export const validationSignUp = (values) => {
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

function validateEmail(email) {
  if (email.trim() === "") {
    return "Email is required";
  }

  if (!emailRegex.test(email.trim())) {
    return "Email is invalid";
  }

  return "";
}

function validatePassword(password) {
  if (password.trim() === "") {
    return "Password is required";
  }

  if (password.trim().length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.trim().length > 14) {
    return "Password must be less than 14 characters";
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

export function validateLogin(values) {
  const errors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };

  return {
    email: errors.email,
    password: errors.email ? "" : errors.password,
  };
}

