import _ from "lodash";
import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import "../../styles/components/taskListView.css";

function TaskListView({ task }) {
  const labels = _.shuffle(["#4339F2", "#FF3838", "#891BE8", "#1AD698"]).slice(
    0,
    Math.floor(Math.random() * 4 + 1)
  );

  return (
    <div className="workspace__taskListView">
      {Math.floor(Math.random() * 2) === 0 && (
        <div
          className="workspace-taskListView__cover"
          style={{
            backgroundImage: `url("https://picsum.photos/310/170")`,
            backgroundSize: "cover",
          }}
        ></div>
      )}

      <div className="workspace__taskListView__label-wrapper">
        {labels.map((label, index) => (
          <div
            key={index}
            className="taskListView__label"
            style={{ backgroundColor: label }}
          ></div>
        ))}
      </div>

      <div className="workspace-taskListView__title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ipsa
        facilis ex rerum, explicabo blanditiis aliquid ea sapiente adipisci
        neque..
      </div>

      <div className="workspace-taskListView__info">
        <div className="taskListView-info__members">
          {Array.from(Array(Math.floor(Math.random() * 4 + 1)).keys()).map(
            (i, index) => (
              <img
                key={index}
                src="https://picsum.photos/50"
                alt="member"
                className="taskListView-info__members-avatar"
              />
            )
          )}
        </div>

        <div className="taskListView-info__details">
          <div className="taskListView-info__comment">
            {Math.floor(Math.random() * 101)}
            <FaRegCommentDots />
          </div>
          <div className="taskListView-info__like">
            {Math.floor(Math.random() * 101)}
            <FaRegHeart />
          </div>
          <div className="taskListView-info__attachment">
            {Math.floor(Math.random() * 101)}
            <FaPaperclip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListView;
