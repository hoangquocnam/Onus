import "../../styles/pages/userprofile.css";

function UserProfile()
{
    return(
        <div className="user-profile__container">
            <nav className="profile-nav__container">
                <h2 className="profile-nav__title">Settings</h2>
                <ul className="profile-nav__list">
                    <li className="profile-nav__item">
                        <a href="">Public profile</a>
                    </li>
                    <li className="profile-nav__item">
                        <a href="">Account Settings</a>
                    </li>
                    <li className="profile-nav__item">
                        <a href="">Notifications</a>
                    </li>
                </ul>
            </nav>
            <h3 className="profile-nav__separator"></h3>
            <div className="public-profile__container">
                <h2 className="public-profile__title">Public profile</h2>
                <div className="public-profile__picture">
                    <img src="https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-1/273526479_2155819074579262_6694043433107174519_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sclassName=7206a8&_nc_ohc=55de4snbLwMAX_CULES&_nc_ht=scontent.fvca1-3.fna&oh=00_AT8DeJ3ihKCuewa0lzSv7-djZrekYG2zG35i_euJBvT--g&oe=62C622C0" alt="" className="public-profile__image" />
                    <div className="public-profile__btn">
                        <button className="public-profile__changeBtn">Change picture</button>
                        <button className="public-profile__deleteBtn">Delete picture</button>
                    </div>    
                </div>
                <form className="public-profile__form">
                    <div className="public-profile__info">
                        <div className="public-profile__fullname">
                            <label>Full name: </label>
                            <input type="text" name="user__fullname" className="input__Fullname" placeholder="Full name"/>
                        </div>
                        <div className="public-profile__gender">
                            <label>Gender: </label>
                            <select name="user_gender" className="user__gender">
                                <option value="male" selected>Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="public-profile__username">
                        <label>Username: </label>
                        <input type="text" name="user__username" className="input" placeholder="Username"/>
                    </div>
                    <div className="public-profile__email">
                        <label>Email: </label>
                        <input type="text" name="user__email" className="input" placeholder="Email"/>
                    </div>
                </form>
                
            </div>        
        </div>
    
    );
}

export default UserProfile;