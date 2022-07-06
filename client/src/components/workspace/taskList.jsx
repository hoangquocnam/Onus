import Task from "./task";
import '../../styles/components/taskList.css';

function TaskList({ tasks }) {
  return (
    <div className="task-list__tasks">
      <Task />
      <Task />
      <div className="task-list__add-new-card">
            + Add new card
      </div>
    </div>
  );
}

export default TaskList;
