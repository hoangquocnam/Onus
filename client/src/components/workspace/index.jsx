import { useEffect, useState } from "react";
import { Container } from "react-smooth-dnd";
import "../../styles/pages/workspace.css";
import TaskList from "./taskList";
import WorkspaceHeader from "./workspaceHeader";
import WorkspaceMenuTab from "./workspaceMenuTab";

function Workspace() {
  const [workspace, setWorkspace] = useState(null);
  const [taskLists, setTaskLists] = useState(null);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const data = require("../../data/workspace.json");

    setWorkspace(data);
    setTaskLists(data.lists);
  }, []);

  function toggleMenuTab() {
    setIsShowMenu(!isShowMenu);
  }

  if (!workspace) {
    return null;
  }

  function onColumnDrop(result) {}

  return (
    <div className="workspace-container">
      <div className="workspace-main">
        <WorkspaceHeader showMenu={toggleMenuTab} workspace={workspace} />

        <div className="workspace-body">
          <div className="workspace-content">
            <Container
              orientation="horizontal"
              onDrop={onColumnDrop}
              dragHandleSelector=".task-list-draggable-handle"
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: "task-list-drop-preview",
              }}
            >
              {taskLists?.map((taskList) => (
                <TaskList key={taskList.id} taskList={taskList} />
              ))}
            </Container>
          </div>
        </div>
      </div>

      <WorkspaceMenuTab isShow={isShowMenu} />
    </div>
  );
}

export default Workspace;
