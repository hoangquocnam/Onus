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

  function addNewTask(taskListIndex, task) {
    const newTaskList = [...taskLists];
    newTaskList[taskListIndex].tasks = [
      ...newTaskList[taskListIndex].tasks,
      task,
    ];

    setTaskLists(newTaskList);
  }

  function onTaskListDrop(result) {
    let newTaskLists = [...taskLists];
    const [removed] = newTaskLists.splice(result.removedIndex, 1);
    newTaskLists.splice(result.addedIndex, 0, removed);
    setTaskLists(newTaskLists);
  }

  function onTaskDrop(taskListID, result) {
    if (result.removedIndex === null && result.addedIndex === null) {
      return;
    }

    const index = taskLists.findIndex((taskList) => taskList.id === taskListID);
    const newTaskList = { ...taskLists[index] };

    if (result.removedIndex !== null) {
      newTaskList.tasks.splice(result.removedIndex, 1);
    }

    if (result.addedIndex !== null) {
      newTaskList.tasks.splice(result.addedIndex, 0, result.payload);
    }

    const newTaskLists = [...taskLists];
    newTaskLists[index] = newTaskList;

    setTaskLists(newTaskLists);
  }

  if (!workspace) {
    return null;
  }

  return (
    <div className="workspace-container">
      <div className="workspace-main">
        <WorkspaceHeader showMenu={toggleMenuTab} workspace={workspace} />

        <div className="workspace-body">
          <div className="workspace-content">
            <Container
              orientation="horizontal"
              onDrop={onTaskListDrop}
              dragHandleSelector=".task-list-draggable-handle"
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: "task-list-drop-preview",
              }}
            >
              {taskLists?.map((taskList, index) => (
                <TaskList
                  key={taskList.id}
                  taskList={taskList}
                  onTaskDrop={onTaskDrop}
                  addNewTask={addNewTask}
                  index={index}
                />
              ))}
            </Container>

            <div className="workspace-new-task-list">
              <div className="workspace-new-task-list-btn disable-user-select">
                + Add new list
              </div>
            </div>
          </div>
        </div>
      </div>

      <WorkspaceMenuTab isShow={isShowMenu} />
    </div>
  );
}

export default Workspace;
