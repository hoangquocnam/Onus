import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { Draggable } from "react-smooth-dnd";
import "../../styles/components/workspaceTask.css";
import MemberAvatarList from "../memberAvatarList";

function Task(props) {
  return (
    <Draggable>
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

        <div className="workspace-task__label-wrapper">
          {props.task.labels.map((label, index) => (
            <div
              key={index}
              className="workspace-task__label"
              style={{ backgroundColor: label.color }}
            ></div>
          ))}
        </div>

        <div className="workspace-task__title">
          {props.task.title.length <= 30
            ? props.task.title
            : props.task.title.substring(0, 30) + "..."}
        </div>

        <div className="workspace-task__description">
          {props.task.description.length <= 60
            ? props.task.description
            : props.task.description.substring(0, 60) + "..."}
        </div>

        <div className="workspace-task__info">
          <MemberAvatarList members={props.task.members} />

          <div className="task-info__details">
            <div className="task-info__comment">
              {Math.floor(Math.random() * 101)}
              <FaRegCommentDots />
            </div>
            <div className="task-info__like">
              {Math.floor(Math.random() * 101)}
              <FaRegHeart />
            </div>
            <div className="task-info__attachment">
              {Math.floor(Math.random() * 101)}
              <FaPaperclip />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Task;
