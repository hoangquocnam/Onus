import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskListStatus from "../../components/workspace/taskListStatus";
import routes from "../../routes";
import "../../styles/pages/workspace.css";
import TaskList from "./taskList";
import WorkspaceHeader from "./workspaceHeader";
import WorkspaceMenuTab from "./workspaceMenuTab";

function Workspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState();
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const workspaces = require("../../data/workspaces.json");

    const foundWorkspace = workspaces.find(
      (workspace) => workspace.id.toString() === id
    );

    if (foundWorkspace) {
      setWorkspace(foundWorkspace);
    } else {
      navigate(routes.home.path);
    }
  }, [id, navigate]);

  function toggleMenuTab() {
    setIsShowMenu(!isShowMenu);
  }

  return (
    <div className="workspace-container">
      <div className="workspace-wrapper">
        <div className="workspace-main">
          <WorkspaceHeader title={workspace?.title} showMenu={toggleMenuTab} />

          <div className="workspace-body">
            <div className="workspace-content">
              <div className="workspace-content__task-list">
                <TaskListStatus status="To Do" />
                <TaskList />
              </div>

              <div className="workspace-content__task-list">
                <TaskListStatus status="In Progress" />
                <TaskList />
              </div>

              <div className="workspace-content__task-list">
                <TaskListStatus status="Fixing" />
                <TaskList />
              </div>

              <div className="workspace-content__task-list">
                <TaskListStatus status="Done" />
                <TaskList />
              </div>

              <div className="workspace-content__task-list">
                <TaskListStatus status="Review" />
                <TaskList />
              </div>

              <div className="workspace-content__task-list">
                <TaskListStatus status="Merge" />
                <TaskList />
              </div>
            </div>
          </div>
        </div>

        <WorkspaceMenuTab isShow={isShowMenu} />
      </div>
    </div>
  );
}

export default Workspace;
