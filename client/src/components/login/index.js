import React from "react";
import "../../styles/login.css";

function LoginForm() {
  const specialChars = "!@#$%^&*()_+{}|:\"<>?[]\\;',./";
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const passwordValidLength = { min: 8, max: 14 };

  function submit(e) {
    e.preventDefault();

    const inputEmail = document.getElementsByClassName("inputLogin__email")[0];
    const inputPassword = document.getElementsByClassName(
      "inputLogin__password"
    )[0];

    if (!validateEmail(inputEmail.value)) {
      showError(inputEmail, "Email is not valid");
      return;
    }

    if (!validatePassword(inputPassword.value)) {
      showError(inputPassword, "Password is not valid");
      return;
    }

    hideError(inputEmail);
    hideError(inputPassword);
  }

  function showError(input, errorMessage) {
    const error = document.getElementsByClassName("login__errorMessage")[0];
    input.focus();
    input.select();
    input.classList.add("error");
    error.textContent = errorMessage;
    error.classList.remove("login__errorMessage--hidden");
  }

  function hideError(input) {
    const error = document.getElementsByClassName("login__errorMessage")[0];
    error.classList.add("login__errorMessage--hidden");
    input.classList.remove("error");
  }

  function validateEmail(email) {
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    if (password.length < passwordValidLength.min) {
      return false;
    }

    if (password.length > passwordValidLength.max) {
      return false;
    }

    let isContainNumber = false;
    let isContainUpperCase = false;
    let isContainLowerCase = false;
    let isContainSpecialCharacter = false;

    for (const ch of password) {
      console.log(ch);
      if (ch >= "0" && ch <= "9") {
        isContainNumber = true;
      }

      if (ch >= "A" && ch <= "Z") {
        isContainUpperCase = true;
      }

      if (ch >= "a" && ch <= "z") {
        isContainLowerCase = true;
      }

      if (specialChars.indexOf(ch) !== -1) {
        isContainSpecialCharacter = true;
      }
    }
    
    return (
      isContainNumber &&
      isContainUpperCase &&
      isContainLowerCase &&
      isContainSpecialCharacter
    );
  }

  return (
    <div className="login__page">
      <div className="login__container">
        <h2 className="login__title">Log in</h2>

        <div className="login__body">
          <form className="login__form">
            <input
              type="email"
              className="inputLogin__email"
              placeholder="Enter email"
              onChange={(e) => hideError(e.target)}
              autoFocus
            />

            <input
              type="password"
              className="inputLogin__password"
              placeholder="Enter password"
              minLength={passwordValidLength.min}
              maxLength={passwordValidLength.max}
              onChange={(e) => hideError(e.target)}
            />

            <p className="login__errorMessage login__errorMessage--hidden">
              Error message
            </p>

            <input
              className="login__buttonSubmit"
              type="submit"
              value="Log in"
              onClick={submit}
            />
          </form>
          <p>OR</p>
        </div>

        <div className="login__footer">
          <a className="link__signUp" href="#">
            Create a new account?
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
