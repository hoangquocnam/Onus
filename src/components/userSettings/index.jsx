import { CgProfile } from 'react-icons/cg';
import { TbSettings } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks';
import routes from '../../routes';
import '../../styles/pages/userSettings.css';

function UserSettings() {
  const navigate = useNavigate();
  const { account } = useAccount();

  const goToPublic = () => {
    navigate(`${routes.account.path}/${account.id}/profile`);
  };

  const goToSettings = () => {
    navigate(routes.account.settings);
  };

  const goToChangePassword = () => {
    navigate(routes.account.changePassword);
  };

  return (
    <div className='user-settings__page'>
      <div className='user-settings__heading'>
        <h2 className='user-settings__heading-text'>Settings</h2>
      </div>

      <div className='user-settings__body'>
        <nav className='user-settings__nav'>
          <ul className='user-settings__nav-list'>
            <li className='user-settings__nav-item' onClick={goToPublic}>
              <CgProfile className='user-settings__nav-item-icon' />
              <span>Public profile</span>
            </li>
            <li
              className='user-settings__nav-item user-settings__nav-item--active'
              onClick={goToSettings}
            >
              <TbSettings className='user-settings__nav-item-icon' />
              <span>Account Settings</span>
            </li>
          </ul>
        </nav>

        <div className='user-settings__content'>
          <button
            type='button'
            className='user-settings__change-password-btn'
            onClick={goToChangePassword}
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
