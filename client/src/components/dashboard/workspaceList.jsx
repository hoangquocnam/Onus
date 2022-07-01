import React, { useState } from "react";
import { useEffect } from "react";
import "../../styles/components/workspaceListView.css";

function WorkspaceItemCard(props) {
  const { title, description, id } = props;
  return (
    <div className="workspace-item-card">
      <div className="workspace-item-card-title">{title}</div>
      <div className="workspace-item-card-description">{description}</div>
    </div>
  );
}

export function WorkspaceListView() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const workspaces = require("../../data/workspaces.json");
    setWorkspaces(workspaces);
  }, []);

  return (
    <React.StrictMode>
      <div className="workspaceListView">
        <p className="workspaceList__title">Workspaces</p>
      </div>

      <div className="workspaceList__container">
        {workspaces.map((workspace) => (
          <WorkspaceItemCard
            key={workspace.id}
            title={workspace.title}
            description={workspace.description}
          />
        ))}
      </div>
    </React.StrictMode>
  );
}
