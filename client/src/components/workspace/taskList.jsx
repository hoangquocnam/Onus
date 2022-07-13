import { BsThreeDots } from "react-icons/bs";
import "../../styles/components/workspaceTaskList.css";
import Task from "./task";

function TaskList(props) {
  return (
    <div className="task-list">
      <div className="task-list__header disable-user-select">
        <h4 className="task-list__title">{props.taskList.title}</h4>
        <div className="task-list__options">
          <BsThreeDots size={30} fill="#CDCCCA" />
        </div>
      </div>

      <div className="task-list__tasks">
        {props.taskList.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div className="task-list__add-new-card disable-user-select">
        + Add new card
      </div>
    </div>
  );
}

export default TaskList;
