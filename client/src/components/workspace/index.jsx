import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskListStatus from "../../components/workspace/taskListStatus";
import routes from "../../routes";
import "../../styles/pages/workspace.css";
import TaskList from "./taskList";
import WorkspaceHeader from "./workspaceHeader";

function Workspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState();

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

  return (
    <div className="workspace-container">
      <div className="workspace-wrapper">
        <WorkspaceHeader title={workspace?.title} />

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
    </div>
  );
}

export default Workspace;
