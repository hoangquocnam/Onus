import { useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { logo, trello_board_mark } from '../../assets';
import { PopoverContainer, PopoverSeparator } from '../../components/popover';
import { useAccount } from '../../hooks';
import routes from '../../routes';
import '../../styles/components/topBar.css';

const TopBarSeparator = () => {
  return <div className='topBar__separator'></div>;
};

export default function TopBar() {
  const { account } = useAccount();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef(null);

  function navigateToAboutPage() {
    navigate(routes.about.path);
  }

  function handleSearch(e) {
    e.preventDefault();
    searchRef.current.focus();

    if (searchText.trim().length === 0) {
      return;
    }

    setSearchText(searchText.trim());
    navigate(`${routes.search.path}?s=${searchText.trim()}`);
  }

  return (
    <div className='topBar'>
      <div className='topBar__left'>
        <div className='topBar__leftSpacing logo'>
          <Link to={routes.home.path} className='topBar__logo'>
            <img src={logo} alt='logo' className='topBar__logoImage' />
          </Link>
        </div>

        <TopBarSeparator />

        <div className='topBar__leftSpacing topBar__boards'>
          <img
            src={trello_board_mark}
            alt='boards'
            className='topBar__boardsImage'
          />
          <div style={{ width: '5px' }}></div>
          <span>Boards</span>
        </div>

        <TopBarSeparator />

        <form
          className='topBar__leftSpacing topBar__searchBox'
          onSubmit={handleSearch}
        >
          <input
            ref={searchRef}
            type='text'
            className='searchField__topBar'
            placeholder='Search'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button type='submit' className='topBar__searchBtn'>
            <AiOutlineSearch size={20} />
          </button>
        </form>
      </div>

      <div className='topBar__right'>
        <div className='topBar__rightSpacing topBar__warning'>
          <FiAlertCircle size={20} onClick={navigateToAboutPage} />
        </div>

        <div className='topBar__rightSpacing topBar__notifications'>
          <NotificationPopover>
            <span>
              <IoMdNotificationsOutline size={22} />
            </span>
          </NotificationPopover>
        </div>

        <div className='topBar__rightSpacing topBar__accountAvatar'>
          <AccountPopover>
            <img src={account.avatar} alt='avt' className='account-avatar' />
          </AccountPopover>
        </div>
      </div>
    </div>
  );
}

function AccountPopover({ children }) {
  const { logout, account } = useAccount();
  const navigate = useNavigate();

  function handleViewProfile() {
    navigate(`${routes.account.path}/${account.id}/profile`);
    document.body.click();
  }

  function handleViewSettings() {
    navigate(routes.account.settings);
    document.body.click();
  }

  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom'
      overlay={
        <PopoverContainer
          title='Account'
          style={{
            maxWidth: '280px',
            width: '100%',
          }}
        >
          <div className='account-popover'>
            <div className='account-popover__info'>
              <img
                src={account.avatar}
                alt='avt'
                className='account-popover__info-avatar'
              />

              <div className='account-popover__info-wrapper'>
                <p className='account-popover__info-fullname'>
                  {account.fullname}
                </p>

                <p className='account-popover__info-email'>{account.email}</p>
              </div>
            </div>

            <PopoverSeparator />

            <button
              type='button'
              className='account-popover__btn'
              onClick={handleViewProfile}
            >
              <FaUser className='account-popover__btn-icon' />
              <span className='account-popover__btn-text'>Profile</span>
            </button>

            <button
              type='button'
              className='account-popover__btn'
              onClick={handleViewSettings}
            >
              <FaCog className='account-popover__btn-icon' />
              <span className='account-popover__btn-text'>Settings</span>
            </button>

            <PopoverSeparator />

            <button
              type='button'
              className='account-popover__btn'
              onClick={logout}
            >
              <FaSignOutAlt className='account-popover__btn-icon' />

              <span className='account-popover__btn-text'>Log out</span>
            </button>
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

function NotificationPopover({ children }) {
  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom'
      overlay={
        <PopoverContainer
          title='Notifications'
          style={{
            maxWidth: '300px',
            width: '100%',
            height: '280px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              marginTop: '10px',
              textAlign: 'center',
            }}
          >
            This function is not implemented yet.
          </p>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
