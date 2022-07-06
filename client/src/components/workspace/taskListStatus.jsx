import { BsThreeDots } from "react-icons/bs";
import '../../styles/components/taskListStatus.css';

function TaskListStatus({ status }) {
  return (
    <div className="task-list__status">
      <h4 className="task-list__status-name">{status}</h4>
      <div className="task-list__status-options">
        <BsThreeDots size={30} fill="#CDCCCA" />
      </div>
    </div>
  );
}

export default TaskListStatus;
