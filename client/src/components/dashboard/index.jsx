import React from "react";
import "../../styles/pages/dashboard.css";
import { WorkspaceListView } from "./workspaceList";
import { TasksListView } from "./tasklistView";


export default function Dashboard() {
  return (
    <React.StrictMode>
      <div className="dashboard">
        <WorkspaceListView />
        <TasksListView />
      </div>
    </React.StrictMode>
  );
}
