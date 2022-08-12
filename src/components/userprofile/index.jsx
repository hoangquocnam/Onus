import _ from 'lodash';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { TbSettings } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { methods } from '../../APIs';
import { useAccount } from '../../hooks';
import routes from '../../routes';
import '../../styles/pages/userprofile.css';
import Spinner from '../spinner';

function UserProfile() {
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { account, updateProfile } = useAccount();
  const [prevData, setPrevData] = useState({});
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      if (id === undefined || id === null) {
        navigate(routes.home.path, {
          replace: true,
        });
      }

      if (id === account.id) {
        setData(
          _.pick(account, [
            'fullname',
            'email',
            'username',
            'gender',
            'avatar',
          ]),
        );
        setIsCurrentUser(true);
      }

      if (id !== account.id) {
        try {
          const { data } = await methods.get(`users/${id}`);
          setData(
            _.pick(data, ['fullname', 'email', 'username', 'gender', 'avatar']),
          );
          setIsCurrentUser(false);
        } catch (error) {
          toast.error(error.response.data.error.message);
          navigate(routes.notFound.path, {
            replace: true,
          });
        }
      }

      setIsLoading(false);
    })();

    return () => {
      setData({});
      setIsLoading(true);
      setIsCurrentUser(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goToPublic = () => {
    navigate(`${routes.account.path}/${account.id}/profile`);
  };

  const goToSettings = () => {
    navigate(routes.account.settings);
  };

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdateProfile() {
    if (isEditing) {
      if (_.isEqual(data, prevData)) {
        setPrevData({});
        setEditing(false);
        return;
      }

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

      setPrevData({});
      setEditing(false);
    }

    if (!isEditing) {
      setPrevData(data);
      setEditing(true);
    }
  }

  function handleCancelUpdateProfile() {
    setData(prevData);
    setEditing(false);
    setPrevData({});
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='user-profile__page'>
      <div className='user-profile__settings'>
        <h2 className='user-profile__title'>
          {isCurrentUser ? 'Settings' : ''}
        </h2>
      </div>

      <div className='user-profile__container'>
        {isCurrentUser && (
          <nav className='profile-nav__container'>
            <ul className='profile-nav__list'>
              <li
                className='profile-nav__item profile-nav__item--active'
                onClick={goToPublic}
              >
                <CgProfile className='public-profile__icon' />
                <span>Public profile</span>
              </li>
              <li className='profile-nav__item' onClick={goToSettings}>
                <TbSettings className='public-profile__icon' />
                <span>Account Settings</span>
              </li>
            </ul>
          </nav>
        )}

        <div className='public-profile__container'>
          <h2 className='public-profile__title'>Public profile</h2>
          <div className='public-profile__picture'>
            <img
              src={data.avatar}
              alt='Avatar'
              className='public-profile__image'
            />

            {isCurrentUser && (
              <div className='public-profile__btn'>
                <button
                  className='public-profile__editBtn'
                  onClick={handleUpdateProfile}
                >
                  {isEditing ? 'Save' : 'Edit profile'}
                </button>

                {isEditing && (
                  <button
                    className='public-profile__cancelBtn'
                    onClick={handleCancelUpdateProfile}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
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
