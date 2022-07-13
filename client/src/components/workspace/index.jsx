import { useEffect, useState } from "react";
import "../../styles/pages/workspace.css";
import TaskList from "./taskList";
import WorkspaceHeader from "./workspaceHeader";
import WorkspaceMenuTab from "./workspaceMenuTab";

function Workspace() {
  const [workspace, setWorkspace] = useState(null);
  const [taskLists, setTaskLists] = useState(null);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const data = require("../../data/workspace.json");

    setWorkspace(data);
    setTaskLists(data.lists);
  }, []);

  function toggleMenuTab() {
    setIsShowMenu(!isShowMenu);
  }

  if (!workspace) {
    return null;
  }

  return (
    <div className="workspace-container">
      <div className="workspace-wrapper">
        <div className="workspace-main">
          <WorkspaceHeader showMenu={toggleMenuTab} workspace={workspace} />

          <div className="workspace-body">
            <div className="workspace-content">
              {taskLists?.map((taskList) => (
                <TaskList key={taskList.id} taskList={taskList} />
              ))}
            </div>
          </div>
        </div>

        <WorkspaceMenuTab isShow={isShowMenu} />
      </div>
    </div>
  );
}

export default Workspace;
