import { useContext, useRef } from 'react';
import { FaPaperclip, FaRegCommentDots, FaRegHeart } from 'react-icons/fa';
import { Draggable } from 'react-smooth-dnd';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/task.css';
import { limitText } from '../../../utils/common';
import MemberAvatarList from '../../memberAvatarList';

export default function Task({ task }) {
  const { setTaskModal } = useContext(WorkspaceContext);
  const taskRef = useRef(null);
  const memberAvatarListRef = useRef(null);

  function handleOnTaskClick(e) {
    if (memberAvatarListRef.current?.contains(e.target)) {
      return;
    }

    if (taskRef.current?.contains(e.target)) {
      setTaskModal(task);
    }
  }

  return (
    <Draggable>
      <div
        ref={taskRef}
        className='task disable-user-select'
        onClick={handleOnTaskClick}
      >
        {task.cover && (
          <div
            className='task__cover'
            style={{
              backgroundImage: `url(${task.cover})`,
              backgroundSize: 'cover',
            }}
          ></div>
        )}

        {task.labels.length > 0 && (
          <div className='task__label-container'>
            {task.labels.map((label, index) => (
              <div
                key={index}
                className='task__label'
                style={{ backgroundColor: label.color }}
              ></div>
            ))}
          </div>
        )}

        <h3 className='task__title'>{limitText(task.title, 40, 1)}</h3>

        {task.description.length > 0 && (
          <p className='task__description'>
            {limitText(task.description, 60, 3)}
          </p>
        )}

        <div className='task__footer'>
          <MemberAvatarList
            ref={memberAvatarListRef}
            container={{
              type: 'task',
              object: task,
            }}
            allowRemove={true}
          />

          <div className='task__footer-right'>
            <div className='task__comment'>
              0
              <FaRegCommentDots size={13} />
            </div>
            <div className='task__like'>
              0
              <FaRegHeart size={13} />
            </div>
            <div className='task__attachment'>
              0
              <FaPaperclip size={13} />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
