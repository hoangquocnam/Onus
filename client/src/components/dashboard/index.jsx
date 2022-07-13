import React from "react";
import "../../styles/pages/dashboard.css";
import { WorkspaceListView, TasksListView } from "./workspaceList";


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
