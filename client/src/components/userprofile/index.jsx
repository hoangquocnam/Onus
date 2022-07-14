import "../../styles/pages/userprofile.css";
import {useAccount} from "../../hooks";
import {CgProfile} from "react-icons/cg"
import {TbSettings} from "react-icons/tb"

function UserProfile() {

  const { account } = useAccount();

  return (
    <div className="user-profile__page">
      <div className="user-profile__settings">
        <h2 className="user-profile__title">Settings</h2>
      </div>
      <div className="user-profile__container">
        <nav className="profile-nav__container">
          <ul className="profile-nav__list">
            <li className="profile-nav__item profile-nav__item--active">
              <CgProfile className="public-profile__icon"/>
              <a href="#">Public profile</a>
            </li>
            <li className="profile-nav__item">
              <TbSettings className="public-profile__icon"/>
              <a href="#">Account Settings</a>
            </li>
          </ul>
        </nav>
        <div className="public-profile__container">
          <h2 className="public-profile__title">Public profile</h2>
          <div className="public-profile__picture">
            <img
              src="https://api.minimalavatars.com/avatar/random/png"
              alt="Avatar"
              className="public-profile__image"
            />
            <div className="public-profile__btn">
              <button className="public-profile__changeBtn">
                Change picture
              </button>
              <button className="public-profile__deleteBtn">
                Delete picture
              </button>
            </div>
          </div>
          <form className="public-profile__form">
            <div className="public-profile__info">
              <div className="public-profile__fullname">
                <label>Full name: </label>
                <input
                  type="text"
                  name="user__fullname"
                  value={account.fullname}
                  className="input__Fullname"
                  placeholder="Full name"
                  disabled
                />
              </div>
              <div className="public-profile__gender">
                <label>Gender: </label>
                <select
                  name="user_gender"
                  className="user__gender"
                  disabled
                  defaultValue={"male"}
                >
                  <option value="gender">{account.gender}</option>
                </select>
              </div>
            </div>
            <div className="public-profile__username">
              <label>Username: </label>
              <input
                type="text"
                name="user__username"
                value={account.username}
                className="input"
                placeholder="Username"
                disabled
              />
            </div>
            <div className="public-profile__email">
              <label>Email: </label>
              <input
                type="text"
                name="user__email"
                value={account.email}
                className="input"
                placeholder="Email"
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
