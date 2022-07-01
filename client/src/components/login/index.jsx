import { createRef, useState } from "react";
import "../../styles/components/login.css";
import { validateLogin } from "../../utils/validate";
import { Link } from "react-router-dom";
import routes from "../../routes";

function LogInForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  function handleInputChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      errors: {
        email: "",
        password: "",
      },
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const errors = validateLogin(values);
    setValues({ ...values, errors });

    if (errors.email) {
      emailInputRef.current.focus();
      emailInputRef.current.select();
    }

    if (errors.password) {
      passwordInputRef.current.focus();
      passwordInputRef.current.select();
    }
  }

  return (
    <div className="login-page">
      <div className="login__container">
        <h2 className="login__title">Log in</h2>

        <div className="login__body">
          <form className="login__form">
            <input
              type="email"
              className={`login__email-input${
                values.errors.email ? " login__input--error" : ""
              }`}
              placeholder="Enter email"
              onChange={handleInputChange}
              name="email"
              value={values.email}
              ref={emailInputRef}
            />

            <input
              type="password"
              className={`login__password-input${
                values.errors.password ? " login__input--error" : ""
              }`}
              placeholder="Enter password"
              minLength={8}
              maxLength={14}
              onChange={handleInputChange}
              name="password"
              value={values.password}
              ref={passwordInputRef}
            />

            {(values.errors.email || values.errors.password) && (
              <div className="login__error-message">
                {values.errors.email || values.errors.password}
              </div>
            )}

            <input
              type="button"
              className="login__submit-btn"
              value="Log in"
              onClick={handleFormSubmit}
            />
          </form>

          <p>OR</p>
        </div>

        <Link to={routes.signUp.path} className="signup__link">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}

export default LogInForm;
