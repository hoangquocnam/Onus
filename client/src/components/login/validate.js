const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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

function validate(values) {
  const errors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };

  return {
    email: errors.email,
    password: errors.email ? "" : errors.password,
  };
}

export default validate;
