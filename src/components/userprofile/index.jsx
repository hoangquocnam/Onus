import '../../styles/pages/userprofile.css';
import { useAccount } from '../../hooks';
import { CgProfile } from 'react-icons/cg';
import { TbSettings } from 'react-icons/tb';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

function UserProfile() {
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

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

  const goToPublic = () => {
    navigate(`${routes.account.path}/${account.id}/profile`);
  };

  const goToSettings = () => {
    navigate(`${routes.account.path}/${account.id}/settings`);
  };

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
            <li className='profile-nav__item profile-nav__item--active'>
              <CgProfile className='public-profile__icon' />
              <span onClick={goToPublic}>Public profile</span>
            </li>
            <li className='profile-nav__item'>
              <TbSettings className='public-profile__icon' />
              <span onClick={goToSettings}>Account Settings</span>
            </li>
          </ul>
        </nav>
        <div className='public-profile__container'>
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
      </div>
    </div>
  );
}

export default UserProfile;
