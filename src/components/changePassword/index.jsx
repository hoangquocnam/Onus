import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount } from '../../hooks';
import routes from '../../routes';
import '../../styles/pages/changePassword.css';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../utils/validate';

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [errorItem, setErrorItem] = useState('');

  const { logout, changePassword } = useAccount();

  const inputRefs = {
    currentPassword: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
  };

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrorItem('');
  }

  function validate() {
    const errors = {
      currentPassword: validatePassword(data.currentPassword, false),
      password: validatePassword(data.password, true),
      confirmPassword: validateConfirmPassword(
        data.password,
        data.confirmPassword,
      ),
    };

    for (const prop in errors) {
      if (!errors.hasOwnProperty(prop)) {
        continue;
      }

      if (errors[prop] !== '') {
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

      await toast.promise(
        changePassword({
          password: data.currentPassword,
          newPassword: data.password,
        }),
        {
          pending: 'Loading...',
          success: {
            render() {
              return 'Your password has been changed successfully';
            },
            autoClose: 1000,
          },
          error: {
            render({ data }) {
              return data.response.data.error.message;
            },
          },
        },
      );

      toast.warning('You will be logged out in 4 second');

      setTimeout(() => {
        logout();
      }, 4000);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='change-password'>
      <div className='change-password__container'>
        <h2 className='change-password__title'>Change password</h2>

        <div className='change-password__body'>
          <form className='change-password__form'>
            <input
              type='password'
              className={`change-password__input ${
                errorItem === 'currentPassword'
                  ? 'change-password__input--error'
                  : ''
              }`}
              placeholder='Current password'
              onChange={handleInputChange}
              name='currentPassword'
              value={data.currentPassword}
              ref={inputRefs.currentPassword}
              autoFocus={true}
              disabled={isLoading}
              minLength={8}
              maxLength={14}
            />

            <input
              type='password'
              className={`change-password__input ${
                errorItem === 'password' ? 'change-password__input--error' : ''
              }`}
              placeholder='New password'
              minLength={8}
              maxLength={14}
              onChange={handleInputChange}
              name='password'
              value={data.password}
              ref={inputRefs.password}
              disabled={isLoading}
            />

            <input
              type='password'
              className={`change-password__input ${
                errorItem === 'password' ? 'change-password__input--error' : ''
              }`}
              placeholder='Confirm new password'
              minLength={8}
              maxLength={14}
              onChange={handleInputChange}
              name='confirmPassword'
              value={data.confirmPassword}
              ref={inputRefs.confirmPassword}
              disabled={isLoading}
            />
            <input
              type='submit'
              className='change-password__submit-btn'
              value='Change'
              onClick={handleFormSubmit}
              disabled={isLoading}
            />
          </form>

          <p>OR</p>
        </div>

        <div className='change-password__footer'>
          <Link to={routes.account.settings} className='change-password__link'>
            Back to account settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
