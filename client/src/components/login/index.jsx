import { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { methods, URL_Requests } from "../../APIs";
import routes from "../../routes";
import { AccountConsumer } from "../../stores/account";
import "../../styles/pages/login.css";
import { authenticate, setTokenToStorage } from "../../utils/common";
import { validateEmail, validatePassword } from "../../utils/validate";

function LogIn() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    item: "",
    text: "",
    type: "",
  });

  const inputRefs = {
    email: createRef(),
    password: createRef(),
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

  function validate() {
    const errors = {
      email: validateEmail(data.email),
      password: validatePassword(data.password, false),
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

  async function handleFormSubmit(e, context) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const responseToken = await methods.post(URL_Requests.login.url, data);

      const token = responseToken.data.token;
      setTokenToStorage(token);

      const responseUser = await authenticate(token);

      context.setAccount(responseUser.data);

      navigate(routes.dashboard.path);
    } catch (error) {
      setMessage({
        item: "",
        text: "Login failed",
        type: "error",
      });
    }
  }

  return (
    <div className="log-in-page">
      <AccountConsumer>
        {(context) => {
          return (
            <div className="log-in__container">
              <h2 className="log-in__title">Log in</h2>

              <div className="log-in__body">
                <form className="log-in__form">
                  <input
                    type="email"
                    className={`log-in__input ${
                      message.item === "email" ? "log-in__input--error" : ""
                    }`}
                    placeholder="Email"
                    onChange={handleInputChange}
                    name="email"
                    value={data.email}
                    ref={inputRefs.email}
                    autoFocus={true}
                  />

                  <input
                    type="password"
                    className={`log-in__input ${
                      message.item === "password" ? "log-in__input--error" : ""
                    }`}
                    placeholder="Password"
                    minLength={8}
                    maxLength={14}
                    onChange={handleInputChange}
                    name="password"
                    value={data.password}
                    ref={inputRefs.password}
                  />

                  {message.type && (
                    <div
                      className={`log-in__message log-in__message--${message.type}`}
                    >
                      {message.text}
                    </div>
                  )}

                  <input
                    type="submit"
                    className="log-in__submit-btn"
                    value="Log in"
                    onClick={(e) => {
                      handleFormSubmit(e, context);
                    }}
                  />
                </form>

                <p>OR</p>
              </div>

              <div className="log-in__footer">
                <Link to={routes.signUp.path} className="log-in__sign-up-link">
                  Create a new account?
                </Link>
              </div>
            </div>
          );
        }}
      </AccountConsumer>
    </div>
  );
}

export default LogIn;
