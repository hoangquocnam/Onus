import _ from "lodash";
import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import "../../styles/components/task.css";
import MemberAvatarList from "../memberAvatarList";

function Task({ task }) {
  const labels = _.shuffle(["#4339F2", "#FF3838", "#891BE8", "#1AD698"]).slice(
    0,
    Math.floor(Math.random() * 4 + 1)
  );

  const title =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi repellendus commodi hic et. Aspernatur possimus amet mollitia accusamus odit ex?";

  const members = new Array(Math.floor(Math.random() * 20 + 1))
    .fill()
    .map((member, index) => ({
      avatar: `https://api.minimalavatars.com/avatar/${index}/png`,
      name: "member",
    }));

  return (
    <div className="workspace__task disable-user-select">
      {Math.floor(Math.random() * 2) === 0 && (
        <div
          className="workspace-task__cover"
          style={{
            backgroundImage: `url("https://picsum.photos/310/170")`,
            backgroundSize: "cover",
          }}
        ></div>
      )}

      <div className="workspace__task__label-wrapper">
        {labels.map((label, index) => (
          <div
            key={index}
            className="task__label"
            style={{ backgroundColor: label }}
          ></div>
        ))}
      </div>

      <div className="workspace-task__title">
        {title.length <= 20 ? title : title.substring(0, 100) + "..."}
      </div>

      <div className="workspace-task__info">
        <MemberAvatarList members={members} />

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
  );
}

export default Task;
