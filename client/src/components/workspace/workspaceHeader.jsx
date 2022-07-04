import { FaGlobeAsia, FaRegHeart } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { MdOutlineSettings } from "react-icons/md";
import "../../styles/components/workspaceHeader.css";

function WorkspaceHeader({ title }) {
  return (
    <div className="workspace-header">
      <div className="workspace-header__wrapper">
        <div className="workspace-header__wrapper--left">
          <h1 className="workspace-header__title">{title}</h1>

          <div className="workspace-header__utility">
            <FaRegHeart size={25} className="workspace-header__bookmark" />

            <div className="workspace-header__separator"></div>

            <div className="workspace-header__visibility">
              <FaGlobeAsia size={25} />
              <p>Public</p>
            </div>

            <div className="workspace-header__separator"></div>

            <GrStorage size={25} className="workspace-header__archive" />
          </div>
        </div>

        <div className="workspace-members">
          {Array.from(Array(Math.floor(Math.random() * 6 + 3)).keys()).map(
            (i, index) => (
              <img
                key={index}
                src="https://picsum.photos/50"
                alt="member"
                className="task-info__members-avatar"
              />
            )
          )}
        </div>
      </div>

      <div className="workspace__settings-btn">
        <MdOutlineSettings size={30} />
        <p className="workspace__settings-text">Settings</p>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
