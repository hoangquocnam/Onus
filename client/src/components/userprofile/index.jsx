/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../styles/pages/userprofile.scss';
import { useAccount } from '../../hooks';
import { CgProfile } from 'react-icons/cg';
import { TbSettings } from 'react-icons/tb';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const [isEditing, setEditing] = useState(false);
  const [isOnAccountSettings, setOnAccountSettings] = useState(false);
  const { account, updateProfile } = useAccount();

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [data, setData] = useState({
    fullname: account.fullname,
    gender: account.gender,
    username: account.username,
    email: account.email,
  });

  //Change password
  const [newPassword, setNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleSumbitPasswordChange = e => {
    e.preventDefault();
    const {
      currentPassword,
      newPassword: newPass,
      confirmPassword,
    } = newPassword;
    if (newPass !== confirmPassword) {
      window.alert('New password and confirm password do not match');
      return;
    }
    updateProfile({ password: newPassword, confirmPassword });
  };
  // End change password
  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdateProfile() {
    if (isEditing) {
      toast.promise(updateProfile(data), {
        pending: 'Loading...',
        success: {
          render() {
            return 'Update profile successfully';
          },
          autoClose: 1000,
        },
        error: 'Update profile failed',
      });
    }

    setEditing(!isEditing);
  }

  return (
    <div className='user-profile__page'>
      <div className='user-profile__settings'>
        <h2 className='user-profile__title'>Settings</h2>
      </div>
      <div className='user-profile__container'>
        <nav className='profile-nav__container'>
          <ul className='profile-nav__list'>
            <li
              className={`profile-nav__item profile-nav__item${
                isOnAccountSettings ? '' : '--active'
              }`}
              onClick={() => setOnAccountSettings(false)}
            >
              <CgProfile className='public-profile__icon' />
              <a href='#'>Public profile</a>
            </li>
            <li
              className={`profile-nav__item profile-nav__item${
                isOnAccountSettings ? '--active' : ''
              }`}
              onClick={() => setOnAccountSettings(true)}
            >
              <TbSettings className='public-profile__icon' />
              <a href='#'>Account Settings</a>
            </li>
          </ul>
        </nav>

        {isOnAccountSettings ? <AccountSettings /> : <PublicProfile />}

        {/* <div className='public-profile__container'>
          <h2 className='public-profile__title'>Public profile</h2>
          <div className='public-profile__picture'>
            <img
              src='https://api.minimalavatars.com/avatar/random/png'
              alt='Avatar'
              className='public-profile__image'
            />
            <div className='public-profile__btn'>
              <button className='public-profile__changeBtn'>
                Change picture
              </button>
              <button
                className='public-profile__editBtn'
                onClick={handleUpdateProfile}
              >
                {isEditing ? 'Confirm' : 'Edit profile'}
              </button>
            </div>
          </div>

          <form
            className={`public-profile__form${
              isOnAccountSettings ? '--hidden' : ''
            }`}
          >
            <div className='public-profile__info'>
              <div className='public-profile__fullname'>
                <label>Full name: </label>
                <input
                  type='text'
                  name='fullname'
                  onChange={handleInputChange}
                  value={data.fullname}
                  placeholder='Full name'
                  disabled={!isEditing}
                />
              </div>
              <div className='public-profile__gender'>
                <label>Gender: </label>
                <select
                  name='gender'
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  defaultValue={data.gender}
                >
                  {genderOptions.map(item => (
                    <option
                      key={item.value}
                      value={item.value}
                      defaultValue={item.value === data.gender}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='public-profile__username'>
              <label>Username: </label>
              <input
                type='text'
                name='username'
                onChange={handleInputChange}
                value={data.username}
                placeholder='Username'
                disabled={!isEditing}
              />
            </div>
            <div className='public-profile__email'>
              <label>Email: </label>
              <input
                type='email'
                name='email'
                onChange={handleInputChange}
                value={data.email}
                placeholder='Email'
                disabled={!isEditing}
              />
            </div>
          </form>
          <form
            className={`public-profile__form${
              isOnAccountSettings ? '' : '--hidden'
            }`}
            onSubmit={handleSumbitPasswordChange}
          >
            <div className='public-profile__password'>
              <div className='public-profile__fullname'>
                <label>Your current password: </label>
                <input
                  type='password'
                  name='currentPassword'
                  value={newPassword.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className='public-profile__new-password'>
              <div className='public-profile__fullname'>
                <label>New password: </label>
                <input
                  type='password'
                  name='newPassword'
                  onChange={handlePasswordChange}
                  value={newPassword.newPassword}
                />
              </div>
            </div>
            <div className='public-profile__confirm-new-password'>
              <div className='public-profile__fullname'>
                <label>Confirm your new password: </label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={newPassword.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className='public-profile__changePassword'>
                Change My Password
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}

function PublicProfile() {
  const [isEditing, setEditing] = useState(false);
  const [isOnAccountSettings, setOnAccountSettings] = useState(false);
  const { account, updateProfile } = useAccount();

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [data, setData] = useState({
    fullname: account.fullname,
    gender: account.gender,
    username: account.username,
    email: account.email,
  });

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdateProfile() {
    if (isEditing) {
      toast.promise(updateProfile(data), {
        pending: 'Loading...',
        success: {
          render() {
            return 'Update profile successfully';
          },
          autoClose: 1000,
        },
        error: 'Update profile failed',
      });
    }

    setEditing(!isEditing);
  }

  return (
    <div className='public-profile__container'>
      <h2 className='public-profile__title'>Public profile</h2>
      <div className='public-profile__picture'>
        <img
          src='https://api.minimalavatars.com/avatar/random/png'
          alt='Avatar'
          className='public-profile__image'
        />
        <div className='public-profile__btn'>
          <button className='public-profile__changeBtn'>Change picture</button>
          <button
            className='public-profile__editBtn'
            onClick={handleUpdateProfile}
          >
            {isEditing ? 'Confirm' : 'Edit profile'}
          </button>
        </div>
      </div>

      <form className='public-profile__form'>
        <div className='public-profile__info'>
          <div className='public-profile__fullname'>
            <label>Full name: </label>
            <input
              type='text'
              name='fullname'
              onChange={handleInputChange}
              value={data.fullname}
              placeholder='Full name'
              disabled={!isEditing}
            />
          </div>
          <div className='public-profile__gender'>
            <label>Gender: </label>
            <select
              name='gender'
              disabled={!isEditing}
              onChange={handleInputChange}
              defaultValue={data.gender}
            >
              {genderOptions.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                  defaultValue={item.value === data.gender}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='public-profile__username'>
          <label>Username: </label>
          <input
            type='text'
            name='username'
            onChange={handleInputChange}
            value={data.username}
            placeholder='Username'
            disabled={!isEditing}
          />
        </div>
        <div className='public-profile__email'>
          <label>Email: </label>
          <input
            type='email'
            name='email'
            onChange={handleInputChange}
            value={data.email}
            placeholder='Email'
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
}

function AccountSettings() {
  const { changePassword } = useAccount();

  const [newPassword, setNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  function handleSumbitPasswordChange(e) {
    // e.preventDefault();
    // const {
    //   currentPassword,
    //   newPassword: newPass,
    //   confirmPassword,
    // } = newPassword;
    // if (newPass !== confirmPassword) {
    //   window.alert('New password and confirm password do not match');
    //   return;
    // }
    // updateProfile({ password: newPassword, confirmPassword });
    e.preventDefault();

    // TODO: validate password here
    // dùng toast để hiển thị thông báo nếu lỗi

    const data = {
      oldPassword: newPassword.currentPassword,
      newPassword: newPassword.newPassword,
    }

    toast.promise(changePassword(data), {
      pending: 'Loading...',
      success: {
        render() {
          return 'Change password successfully';
        },
        autoClose: 1000,
      },
      error: 'Change password failed',
    });
  };

  return (
    <div className='account-settings-container'>
      <form onSubmit={handleSumbitPasswordChange}>
        <div className='public-profile__password'>
          <div className='public-profile__fullname'>
            <label>Your current password: </label>
            <input
              type='password'
              name='currentPassword'
              value={newPassword.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className='public-profile__new-password'>
          <div className='public-profile__fullname'>
            <label>New password: </label>
            <input
              type='password'
              name='newPassword'
              onChange={handlePasswordChange}
              value={newPassword.newPassword}
            />
          </div>
        </div>
        <div className='public-profile__confirm-new-password'>
          <div className='public-profile__fullname'>
            <label>Confirm your new password: </label>
            <input
              type='password'
              name='confirmPassword'
              value={newPassword.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button className='public-profile__changePassword'>
            Change My Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
