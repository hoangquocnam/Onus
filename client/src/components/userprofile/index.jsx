import "../../styles/pages/userprofile.css";

function UserProfile() {
  return (
    <div className="user-profile__page">
      <div className="user-profile__settings">
        <h2 className="user-profile__title">Settings</h2>
      </div>
      <div className="user-profile__container">
        <nav className="profile-nav__container">
          <ul className="profile-nav__list">
            <li className="profile-nav__item profile-nav__item--active">
              <a href="#">Public profile</a>
            </li>
            <li className="profile-nav__item">
              <a href="#">Account Settings</a>
            </li>
          </ul>
        </nav>
        <div className="profile-nav__separator"></div>
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
                  defaultValue={"Male"}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="public-profile__username">
              <label>Username: </label>
              <input
                type="text"
                name="user__username"
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
