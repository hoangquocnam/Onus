import { BsThreeDots } from "react-icons/bs";
import { Container, Draggable } from "react-smooth-dnd";
import "../../styles/components/workspaceTaskList.css";
import Task from "./task";
import { FaTimes } from "react-icons/fa";

function TaskList(props) {
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
        <div className="task-list__add-new-card-container">
            <textarea
              type="text"
              className="task-list__add-new-card-board"
              rows="1"
              maxlength="40"
              placeholder="Enter a title for this card..."
            ></textarea>
            <div className="task-list__group-btn">
              <button type="submit" className="task-list__add-new-card-btn">
                Add card
              </button>
              <div className="task-list__add-new-card-cancel">
                <FaTimes />
              </div>
            </div>
          </div>
        <div className="task-list__add-new-card disable-user-select">
              + Add new card
        </div>
      </div>
    </Draggable>
  );
}

export default TaskList;
