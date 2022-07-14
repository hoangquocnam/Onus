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

        {props.task.labels.length > 0 && (
          <div className="workspace-task__label-wrapper">
            {props.task.labels.map((label, index) => (
              <div
                key={index}
                className="workspace-task__label"
                style={{ backgroundColor: label.color }}
              ></div>
            ))}
          </div>
        )}

        <h3 className="workspace-task__title">
          {props.task.title.length <= 40
            ? props.task.title
            : props.task.title.substring(0, 40) + "..."}
        </h3>

        <p className="workspace-task__description">
          {props.task.description.length <= 60
            ? props.task.description
            : props.task.description.substring(0, 60) + "..."}
        </p>

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
    </Draggable>
  );
}

export default Task;
