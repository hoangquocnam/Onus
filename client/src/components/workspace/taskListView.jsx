import _ from "lodash";
import { FaPaperclip, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import "../../styles/components/taskListView.css";

function TaskListView({ task }) {
  const labels = _.shuffle(["#4339F2", "#FF3838", "#891BE8", "#1AD698"]).slice(
    0,
    Math.floor(Math.random() * 4 + 1)
  );

  return (
    <div className="dashboard__taskListView">
      <div className="dashboard-taskListView__container">
        {Math.floor(Math.random() * 2) === 0 && (
          <div
            className="dashboard-taskListView__cover"
            style={{
              backgroundImage: `url("https://picsum.photos/310/170")`,
              backgroundSize: "cover",
            }}
          ></div>
        )}

        <div className="dashboard__taskListView__label-wrapper">
          {labels.map((label, index) => (
            <div
              key={index}
              className="taskListView__label"
              style={{ backgroundColor: label }}
            ></div>
          ))}
        </div>

        <div className="dashboard-taskListView__title">Task title</div>
        <div className="dashboard-taskListView__description">
          Lorem ipsum dolor sit amet consectetur Lorem. Lorem ipsum dolor sit
        </div>
        <div className="dashboard-taskListView__info">
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
    </div>
  );
}

export default TaskListView;
