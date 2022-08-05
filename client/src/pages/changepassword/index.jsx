import { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from '../../hooks';
import '../../styles/pages/changePassword.scss';
import { validatePassword } from '../../utils/validate';

function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const [errorItem, setErrorItem] = useState('');

  const { changePassword } = useAccount();

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
      password: validatePassword(data.password, false),
      confirmPassword: validatePassword(data.confirmPassword, false),
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
    if (data.password !== data.confirmPassword) {
      toast.error('Password do not match');
      return;
    }
    try {
      setIsLoading(true);

      await toast.promise(changePassword(data), {
        pending: 'Loading...',
        success: {
          render() {
            return 'Your password has been updated successful';
          },
          autoClose: 1000,
        },
        error: 'Change password failed',
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='change-password-page'>
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
              placeholder='Enter your password'
              onChange={handleInputChange}
              name='currentPassword'
              value={data.currentPassword}
              ref={inputRefs.currentPassword}
              autoFocus={true}
              disabled={isLoading}
            />

            <input
              type='password'
              className={`change-password__input ${
                errorItem === 'password' ? 'change-password__input--error' : ''
              }`}
              placeholder='Enter your new password'
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
              placeholder='Confirm your password'
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
              value='Save'
              onClick={handleFormSubmit}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
