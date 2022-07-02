import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "../../styles/components/workspaceListView.css";

function WorkspaceItemCard(props) {
  const { title, description, itemId } = props;

  return (
    <div className="workspace-item-card" tabIndex={0}>
      <p className="workspace-item-card-title">{title}</p>
      <p className="workspace-item-card-description">{description}</p>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button
      disabled={isFirstItemVisible}
      className="workspace-list-view-arrow"
      style={{ width: "50px", height: "50px" }}
      onClick={() => scrollPrev()}
    >
      <AiOutlineArrowLeft size={20} />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button
      disabled={isLastItemVisible}
      className="workspace-list-view-arrow"
      onClick={() => scrollNext()}
    >
      <AiOutlineArrowRight size={20} />
    </button>
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

        <div className="workspaceList__container">
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} scrollContainerClassName>
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
      </div>
    </React.StrictMode>
  );
}
