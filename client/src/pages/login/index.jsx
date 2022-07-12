import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "../../hooks";
import routes from "../../routes";
import "../../styles/pages/login.css";
import { validateEmail, validatePassword } from "../../utils/validate";

function LogInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorItem, setErrorItem] = useState("");

  const { login } = useAccount();

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

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsLoading(true);

      await toast.promise(login(data), {
        pending: "Loading...",
        success: {
          render() {
            return "Login successful";
          },
          autoClose: 1000,
        },
        error: "Login failed",
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="log-in-page">
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

            <div className="log-in_remember-box">
              <input
                type="checkbox"
                className="remember-box_checkbox"
                id="remember-box_ID"
                value="Remember"
              />
              <label htmlFor="remember-box_ID" className="remember-box_title">
                Remember Me
              </label>
            </div>

            <input
              type="submit"
              className="log-in__submit-btn"
              value="Log in"
              onClick={handleFormSubmit}
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
    </div>
  );
}

export default LogInPage;
