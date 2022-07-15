import { useRef, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { logo, trello_board_mark } from '../../assets';
import { useAccount, useOutsideAlerter } from '../../hooks';
import routes from '../../routes';
import '../../styles/components/topBar.css';

const TopBarSeparator = () => {
  return <div className='topBar__separator'></div>;
};

export default function TopBar() {
  const navigate = useNavigate();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const { logout } = useAccount();

  useOutsideAlerter(accountMenuRef, target => {
    if (isAccountMenuOpen) {
      if (target.classList.contains('account-avatar')) {
        return;
      }

      setIsAccountMenuOpen(false);
    }
  });

  function handleLogout() {
    logout();
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
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type='search'
            className='searchField__topBar'
            placeholder='Search'
          />
          <button type='submit' className='topBar__searchBtn'>
            <AiOutlineSearch size={20} />
          </button>
        </form>
      </div>

      <div className='topBar__right'>
        <div className='topBar__rightSpacing topBar__plus'>
          <AiOutlinePlusCircle size={20} />
        </div>

        <div className='topBar__rightSpacing topBar__warning'>
          <FiAlertCircle size={20} />
        </div>

        <div className='topBar__rightSpacing topBar__notifications'>
          <IoMdNotificationsOutline size={22} />
        </div>

        <div className='topBar__rightSpacing topBar__accountAvatar'>
          <div className='topBar__avatar'>
            <img
              src='https://api.minimalavatars.com/avatar/random/png'
              alt='avt'
              className='account-avatar'
              onClick={() => {
                setIsAccountMenuOpen(!isAccountMenuOpen);
              }}
            />

            {isAccountMenuOpen && (
              <div ref={accountMenuRef} className='top-bar__dropdown-menu'>
                <h3 className='top-bar__dropdown-menu-title'>Account</h3>
                <ul className='top-bar__dropdown-menu-list'>
                  <li className='top-bar__dropdown-item-separator'></li>
                  <li
                    className='top-bar__dropdown-item'
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      navigate(routes.account.profile.publicProfile);
                    }}
                  >
                    Profile
                  </li>
                  <li className='top-bar__dropdown-item'>Settings</li>
                  <li className='top-bar__dropdown-item-separator'></li>
                  <li className='top-bar__dropdown-item' onClick={handleLogout}>
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
