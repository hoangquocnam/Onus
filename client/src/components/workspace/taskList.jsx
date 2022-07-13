import "../../styles/components/taskList.css";
import Task from "./task";

function TaskList({ tasks }) {
  return (
    <div className="task-list__tasks">
      <Task />
      <Task />
      <div className="task-list__add-new-card disable-user-select">
        + Add new card
      </div>
    </div>
  );
}

export default TaskList;
