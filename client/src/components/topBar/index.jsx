import React from "react";
import "../../styles/components/topBar.css";
import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import routes from "../../routes";

const TopBarSeparator = () => {
  return <div className="topBar__separator"></div>;
};

export default function TopBar() {
  return (
    <div className="topBar">
      <div className="topBar__left">
        <div className="topBar__leftSpacing">
          <Link to={routes.home.path} className = "topBar__logo">
            <img
              src={require("../../assets/logo_transparent.png")}
              alt="logo"
              className="topBar__logoImage"
            />
          </Link>
        </div>

        <TopBarSeparator />

        <div className="topBar__leftSpacing topBar__boards">
          <img
            src={require("../../assets/trello-mark-blue.png")}
            alt="boards"
            className="topBar__boardsImage"
          />
          <div style={{ width: "5px" }}></div>
          <span>Boards</span>
        </div>
        <TopBarSeparator />

        <div className="topBar__leftSpacing topBar__searchBox">
          <input type="search" className="searchField__topBar" />
          <AiOutlineSearch size={20}/>
        </div>
      </div>

      <div className="topBar__right">
        <div className="topBar__rightSpacing topBar__plus">
          <AiOutlinePlusCircle size={20}></AiOutlinePlusCircle>
        </div>

        <div className="topBar__rightSpacing topBar__warning">
          <FiAlertCircle size={20}></FiAlertCircle>
        </div>

        <div className="topBar__rightSpacing topBar__notifications">
          <IoMdNotificationsOutline size={20}></IoMdNotificationsOutline>
        </div>

        <div className="topBar__rightSpacing topBar__accountAvatar">
          <div className="topBar__avatar ">
            <Link to={routes.account.path}>
              <img
                src="https://api.minimalavatars.com/avatar/random/png"
                alt="avt"
                className="account-avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
