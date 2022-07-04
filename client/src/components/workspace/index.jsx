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
  }, []);

  return (
    <div className="workspace-container">
      <WorkspaceHeader title={workspace?.title} />

      <div className="workspace-body">
        <div className="workspace-body__task-list">
          <TaskListStatus status="To Do" />
          <TaskList />
        </div>

        <div className="workspace-body__task-list">
          <TaskListStatus status="In Progress" />
          <TaskList />
        </div>

        <div className="workspace-body__task-list">
          <TaskListStatus status="To Do" />
          <TaskList />
        </div>
        <div className="workspace-body__task-list">
          <TaskListStatus status="To Do" />
          <TaskList />
        </div>
        <div className="workspace-body__task-list">
          <TaskListStatus status="To Do" />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
