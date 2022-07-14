import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Container, Draggable } from "react-smooth-dnd";
import { toast } from "react-toastify";
import "../../styles/components/workspaceTaskList.css";
import Task from "./task";

function TaskList(props) {
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const newTaskTitleRef = useRef(null);

  function handleCreateNewTask(e) {
    e.preventDefault();

    if (newTaskTitle.length === 0) {
      newTaskTitleRef.current.focus();
      toast.error("Task title is required");
      return;
    }

    props.addNewTask(props.index, {
      id: Math.floor(Math.random() * 10000),
      title: newTaskTitle,
      description: "",
      members: [],
      labels: [],
      order: props.taskList.tasks.length,
    });

    setNewTaskTitle("");
    setShowNewTask(false);
  }

  function handleNewTaskInputChange(e) {
    setNewTaskTitle(e.target.value);
  }

  return (
    <Draggable>
      <div className="task-list">
        <div className="task-list__header disable-user-select task-list-draggable-handle">
          <h4 className="task-list__title">{props.taskList.title}</h4>
          <div className="task-list__options">
            <BsThreeDots size={30} fill="#CDCCCA" />
          </div>
        </div>

        <div className="task-list__tasks">
          <Container
            orientation="vertical"
            groupName="column"
            onDrop={(result) => props.onTaskDrop(props.taskList.id, result)}
            getChildPayload={(index) => props.taskList.tasks[index]}
            dragClass="task-list__task-drag"
            dropClass="task-list__task-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "task-drop-preview",
            }}
          >
            {props.taskList.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </Container>
        </div>

        {showNewTask && (
          <div className="task-list__add-new-card-container">
            <form onSubmit={handleCreateNewTask}>
              <input
                type="text"
                className="task-list__add-new-card-board"
                placeholder="Enter a title for this card..."
                autoFocus={true}
                value={newTaskTitle}
                onChange={handleNewTaskInputChange}
                ref={newTaskTitleRef}
              />

              <div className="task-list__group-btn">
                <button type="submit" className="task-list__add-new-card-btn">
                  Add card
                </button>
                <div
                  className="task-list__add-new-card-cancel"
                  onClick={() => {
                    setShowNewTask(false);
                    setNewTaskTitle("");
                  }}
                >
                  <FaTimes />
                </div>
              </div>
            </form>
          </div>
        )}

        {!showNewTask && (
          <div
            className="task-list__add-new-card disable-user-select"
            onClick={() => setShowNewTask(true)}
          >
            + Add new card
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default TaskList;
