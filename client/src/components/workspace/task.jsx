import _ from "lodash";
import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import "../../styles/components/task.css";

function Task({ task }) {
  const labels = _.shuffle(["#4339F2", "#FF3838", "#891BE8", "#1AD698"]).slice(
    0,
    Math.floor(Math.random() * 4 + 1)
  );

  return (
    <div className="workspace__task">
      {Math.floor(Math.random() * 2) === 0 && (
        <img
          className="workspace-task__cover"
          src="https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="cover"
        />
      )}

      <div className="workspace__task__label-wrapper">
        {labels.map((label) => (
          <div className="task__label" style={{ backgroundColor: label }}></div>
        ))}
      </div>
      
      <div className="workspace-task__title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa
        facilis ex rerum, explicabo blanditiis aliquid ea sapiente adipisci
        neque..
      </div>

      <div className="workspace-task__info">
        <div className="task-info__members">
          {Array.from(Array(Math.floor(Math.random() * 4 + 1)).keys()).map(
            (i) => (
              <img
                src="https://picsum.photos/50"
                alt="member"
                className="task-info__members-avatar"
              />
            )
          )}

          {/* <FaPlusCircle
            size={30}
            color="#000"
            className="task-info__add-member-btn"
          /> */}
        </div>

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
