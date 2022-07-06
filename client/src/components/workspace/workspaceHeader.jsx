import {
  FaBars,
  FaFilter,
  FaGlobeAsia,
  FaRegStar,
  FaUserPlus,
} from "react-icons/fa";
import "../../styles/components/workspaceHeader.css";

function WorkspaceHeader(item) {
  const { title, showMenu } = item;

  return (
    <div className="workspace-header">
      <div className="workspace-header__left">
        <h1 className="workspace-header__title">{title}</h1>

        <div className="workspace-header__utility">
          <FaRegStar size={25} className="workspace-header__bookmark" />

          <div className="workspace-header__separator"></div>

          <div className="workspace-header__visibility">
            <FaGlobeAsia size={25} />
            <p>Public</p>
          </div>

          <div className="workspace-header__separator"></div>
        </div>

        <div className="workspace-header__members">
          {Array.from(Array(Math.floor(Math.random() * 6 + 3)).keys()).map(
            (i, index) => (
              <img
                key={index}
                src="https://picsum.photos/50"
                alt="member"
                className="workspace-header__member-avatar"
              />
            )
          )}
        </div>
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
          onClick={showMenu}
        >
          <FaBars size={24} />
          <p>Menu</p>
        </button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
