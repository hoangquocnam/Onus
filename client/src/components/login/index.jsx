import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { methods, URL_Requests } from "../../APIs";
import routes from "../../routes";
import { AccountConsumer } from "../../stores/account";
import "../../styles/pages/login.css";
import { authenticate, setTokenToStorage } from "../../utils/common";
import { validateEmail, validatePassword } from "../../utils/validate";

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorItem, setErrorItem] = useState("");

  const inputRefs = {
    email: createRef(),
    password: createRef(),
  };

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrorItem("");
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
        setErrorItem(prop);
        toast.error(`${errors[prop]}`);

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
      setIsLoading(true);

      const responseToken = await toast.promise(
        methods.post(URL_Requests.login.url, data),
        {
          pending: "Loading...",
          success: {
            render() {
              return "Login successful";
            },
            autoClose: 1000,
          },
          error: "Login failed",
        }
      );

      const token = responseToken.data.token;
      setTokenToStorage(token);

      const responseUser = await authenticate(token);
      context.setAccount(responseUser.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
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
                      errorItem === "email" ? "log-in__input--error" : ""
                    }`}
                    placeholder="Email"
                    onChange={handleInputChange}
                    name="email"
                    value={data.email}
                    ref={inputRefs.email}
                    autoFocus={true}
                    disabled={isLoading}
                  />

                  <input
                    type="password"
                    className={`log-in__input ${
                      errorItem === "password" ? "log-in__input--error" : ""
                    }`}
                    placeholder="Password"
                    minLength={8}
                    maxLength={14}
                    onChange={handleInputChange}
                    name="password"
                    value={data.password}
                    ref={inputRefs.password}
                    disabled={isLoading}
                  />

                  <input
                    type="submit"
                    className="log-in__submit-btn"
                    value="Log in"
                    onClick={(e) => {
                      handleFormSubmit(e, context);
                    }}
                    disabled={isLoading}
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
