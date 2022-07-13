import {
  FaBars,
  FaFilter,
  FaGlobeAsia,
  FaRegStar,
  FaUserPlus,
} from "react-icons/fa";
import "../../styles/components/workspaceHeader.css";
import MemberAvatarList from "../memberAvatarList";

function WorkspaceHeader(props) {
  const members = new Array(Math.floor(Math.random() * 20 + 1))
    .fill()
    .map((member, index) => ({
      avatar: `https://api.minimalavatars.com/avatar/${index}/png`,
      name: "member",
    }));

  return (
    <div className="workspace-header">
      <div className="workspace-header__left">
        <h1 className="workspace-header__title">{props.title}</h1>

        <div className="workspace-header__utility">
          <FaRegStar size={25} className="workspace-header__bookmark" />

          <div className="workspace-header__separator"></div>

          <div className="workspace-header__visibility">
            <FaGlobeAsia size={25} />
            <p>Public</p>
          </div>

          <div className="workspace-header__separator"></div>
        </div>

        <MemberAvatarList members={members} />
      </div>

      <div className="workspace-header__right">
        <button type="button" className="workspace-header__btn">
          <FaUserPlus size={24} />
          <p>Invite</p>
        </button>

        <button type="button" className="workspace-header__btn">
          <FaFilter size={24} />
          <p>Filter</p>
        </button>

        <button
          type="button"
          className="workspace-header__btn"
          onClick={props.showMenu}
        >
          <FaBars size={24} />
          <p>Menu</p>
        </button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
