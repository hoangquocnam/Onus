import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import "../../styles/components/workspaceTask.css";
import MemberAvatarList from "../memberAvatarList";

function Task(props) {
  return (
    <div className="workspace__task disable-user-select">
      {props.task.cover && (
        <div
          className="workspace-task__cover"
          style={{
            backgroundImage: `url(${props.task.cover})`,
            backgroundSize: "cover",
          }}
        ></div>
      )}

      <div className="workspace__task__label-wrapper">
        {props.task.labels.map((label, index) => (
          <div
            key={index}
            className="task__label"
            style={{ backgroundColor: label.color }}
          ></div>
        ))}
      </div>

      <div className="workspace-task__title">
        {props.task.title.length <= 40
          ? props.task.title
          : props.task.title.substring(0, 40) + "..."}
      </div>

      <div className="workspace-task__description">
        {props.task.description.length <= 100
          ? props.task.description
          : props.task.description.substring(0, 100) + "..."}
      </div>

      <div className="workspace-task__info">
        <MemberAvatarList members={props.task.members} />

        <div className="task-info__details">
          <div className="task-info__comment">
            0
            <FaRegCommentDots />
          </div>
          <div className="task-info__like">
            0
            <FaRegHeart />
          </div>
          <div className="task-info__attachment">
            0
            <FaPaperclip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
