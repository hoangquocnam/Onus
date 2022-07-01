import React from "react";
import "../../styles/pages/dashboard.css";
import { WorkspaceListView } from "./workspaceList";

export default function Dashboard() {
  return (
    <React.StrictMode>
      <div className="dashboard">
        <WorkspaceListView />
        <div>Tasks</div>
        <div>New</div>
        <div>Completed</div>
      </div>
    </React.StrictMode>
  );
}
