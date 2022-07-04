import { useEffect, useState } from "react";
import TaskListStatus from "../../components/workspace/taskListStatus";
import "../../styles/pages/workspace.css";
import TaskList from "./taskList";
import WorkspaceHeader from "./workspaceHeader";

function Workspace() {
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const workspaces = require("../../data/workspaces.json");
    setWorkspace(workspaces[Math.floor(Math.random() * workspaces.length)]);
  }, []);

  return (
    <div className="workspace-container">
      <WorkspaceHeader />

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
