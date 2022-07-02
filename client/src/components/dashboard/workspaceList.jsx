import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import _ from "lodash";
import "../../styles/components/workspaceListView.css";

function WorkspaceItemCard(props) {
  const { title, description, members } = props;

  const randomColor = ["#EEF7FB", "#f4f4f4", "#F8F1FF", "#FEF7EF"];

  return (
    <div className="workspace-item-card" tabIndex={0} style = {{
      backgroundColor: randomColor[Math.floor(Math.random() * randomColor.length)]
    }}>
      <p className="workspace-item-card-title">{title}</p>
      <p className="workspace-item-card-description">{description}</p>

      <div className="workspace-item-card-footer">
        <div className="workspace-item-card-members">
          {_.isArray(members)
            ? members.slice(0, 6).map((member, index) => {
                return (
                  <div
                    className="workspace-item-card-member"
                    style={{ left: 20 * index + "px" }}
                    key={index}
                  >
                    {index <= 4 ? (
                      <img
                        src={member}
                        alt="avatar"
                        style={{
                          width: "30px",
                          height: "30px",
                        }}
                      />
                    ) : (
                      <div>{`+${members.length - index}`}</div>
                    )}
                  </div>
                );
              })
            : "members"}
        </div>
        <BsArrowRight size={20} className="workspace-item-card-arrow" />
      </div>
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
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {workspaces.map((workspace) => (
              <WorkspaceItemCard
                key={workspace.id}
                title={workspace.title}
                description={workspace.description}
                itemId={workspace.id}
                members={workspace.members}
              />
            ))}
            
          </ScrollMenu>
        </div>
      </div>
    </React.StrictMode>
  );
}
