import _ from "lodash";
import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import routes from "../../routes";
import "../../styles/components/tasklistView.scss";

import TaskListView from "../workspace/taskListView";

function WorkspaceItemCard(props) {
  const { itemId: id, title, description, members } = props;
  const randomColor = ["#EEF7FB", "#f4f4f4", "#F8F1FF", "#FEF7EF"];
  const navigate = useNavigate();

  function handleClickWorkSpace() {
    navigate(`${routes.workspaces.path}/${id}`);
  }

  return (
    <div
      className="tasklistView-item-card"
      onClick={handleClickWorkSpace}
      tabIndex={0}
      style={{
        backgroundColor:
          randomColor[Math.floor(Math.random() * randomColor.length)],
      }}
    >
      <p className="tasklistView-item-card-title">{title}</p>
      <p className="tasklistView-item-card-description">{description}</p>

      <div className="tasklistView-item-card-footer">
        <div className="tasklistView-item-card-members">
          {_.isArray(members)
            ? members.slice(0, 6).map((member, index) => {
                return (
                  <div
                    className="tasklistView-item-card-member"
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
        <BsArrowRight size={20} className="tasklistView-item-card-arrow" />
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
      className="tasklistView-list-view-arrow"
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
      className="tasklistView-list-view-arrow"
      onClick={() => scrollNext()}
    >
      <AiOutlineArrowRight size={20} />
    </button>
  );
}

export function TasksListView() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  useEffect(() => {
    const workspaces = require("../../data/workspaces.json");
    setWorkspaces(workspaces);
  }, []);

  return (
    <React.StrictMode>
      <div className="tasklistViewListView">
        <p className="tasklistViewList__title">Tasks</p>

        <div className="tasklistViewList__container">
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {workspaces.map((task) => (
              <TaskListView />
            ))}
            <div
              className="tasklistView-item-card--add-new-workspace"
              onClick={() => setShowCreateWorkspace(true)}
            >
              <p className="tasklistView-item-card--add-new-workspace-heading">
                + Add new card
              </p>
            </div>
          </ScrollMenu>
        </div>
        {showCreateWorkspace}
      </div>
    </React.StrictMode>
  );
}
