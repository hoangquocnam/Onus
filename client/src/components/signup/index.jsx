import { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes";
import "../../styles/pages/signup.css";
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from "../../utils/validate";
import SelectGender from "./selectGender";
import { URL_Requests, methods } from "../../APIs";

function SignUp() {
  const navigate = useNavigate();

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const [data, setData] = useState({
    fullName: "",
    username: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    item: "",
    text: "",
    type: "",
  });

  const inputRefs = {
    fullName: createRef(),
    username: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
  };

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setMessage({
      item: "",
      text: "",
      type: "",
    });
  }

  function handleGenderChange(selected) {
    setData({
      ...data,
      gender: selected.value,
    });
  }

  function validate() {
    const errors = {
      fullName: validateFullName(data.fullName),
      username: validateUsername(data.username),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      confirmPassword: validateConfirmPassword(
        data.password,
        data.confirmPassword
      ),
    };

    for (const prop in errors) {
      if (!errors.hasOwnProperty(prop)) {
        continue;
      }

      if (errors[prop] !== "") {
        setMessage({
          item: prop,
          text: errors[prop],
          type: "error",
        });

        inputRefs[prop].current.focus();
        inputRefs[prop].current.select();

        return false;
      }
    }

    return true;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await methods.post(URL_Requests.signUp.url, {
        fullname: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender,
      });

      navigate(routes.login.path);
    } catch (error) {
      setMessage({
        item: "",
        text: "Sign up failed. Please try again.",
        type: "error",
      });
    }
  }

  return (
    <div className="sign-up-page">
      <div className="sign-up__container">
        <h2 className="sign-up__title">Sign Up</h2>

        <div className="sign-up__body">
          <form className="sign-up__form">
            <input
              type="text"
              className={`sign-up__input ${
                message.item === "fullName" ? "sign-up__input--error" : ""
              }`}
              placeholder="Full name"
              onChange={handleInputChange}
              name="fullName"
              value={data.fullName}
              ref={inputRefs.fullName}
              autoFocus={true}
            />

            <div className="sign-up__input-group">
              <input
                type="text"
                className={`sign-up__input ${
                  message.item === "username" ? "sign-up__input--error" : ""
                }`}
                placeholder="Username"
                onChange={handleInputChange}
                name="username"
                value={data.username}
                ref={inputRefs.username}
              />

              <SelectGender
                options={genderOptions}
                onChange={handleGenderChange}
                className="sign-up_select-gender"
              />
            </div>

            <input
              type="email"
              className={`sign-up__input ${
                message.item === "email" ? "sign-up__input--error" : ""
              }`}
              placeholder="Email"
              onChange={handleInputChange}
              name="email"
              value={data.email}
              ref={inputRefs.email}
            />

            <input
              type="password"
              className={`sign-up__input ${
                message.item === "password" ? "sign-up__input--error" : ""
              }`}
              placeholder="Password"
              minLength={8}
              maxLength={14}
              onChange={handleInputChange}
              name="password"
              value={data.password}
              ref={inputRefs.password}
            />

            <input
              type="password"
              className={`sign-up__input ${
                message.item === "confirmPassword"
                  ? "sign-up__input--error"
                  : ""
              }`}
              placeholder="Confirm password"
              minLength={8}
              maxLength={14}
              onChange={handleInputChange}
              name="confirmPassword"
              value={data.confirmPassword}
              ref={inputRefs.confirmPassword}
            />

            {message.type && (
              <div
                className={`sign-up__message sign-up__message--${message.type}`}
              >
                {message.text}
              </div>
            )}

            <input
              type="submit"
              className="sign-up__submit-btn"
              value="Create new account"
              onClick={handleFormSubmit}
            />
          </form>

          <p>OR</p>
        </div>

        <div className="sign-up__footer">
          <Link to={routes.login.path} className="sign-up__log-in-link">
            Already had an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
