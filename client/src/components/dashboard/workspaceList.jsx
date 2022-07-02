import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "../../styles/components/workspaceListView.css";

function WorkspaceItemCard(props) {
  const { title, description, itemId } = props;

  return <div className="workspace-item-card" tabIndex={0}></div>;
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button
      type="button"
      style={{ width: "50px", height: "50px" }}
      onClick={() => scrollPrev()}
    />
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <input
      type="button"
      style={{ width: "50px", height: "50px" }}
      onClick={() => scrollNext()}
    />
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
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {workspaces.map((workspace) => (
            <WorkspaceItemCard
              key={workspace.id}
              title={workspace.title}
              description={workspace.description}
              itemId={workspace.id}
            />
          ))}
        </ScrollMenu>
      </div>
    </React.StrictMode>
  );
}
