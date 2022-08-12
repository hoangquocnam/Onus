import { useContext, useRef } from 'react';
import { FaPager } from 'react-icons/fa';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskModalHeader.css';

export default function TaskModalHeader({ task, setTask }) {
  const { taskModal, updateTask, workspace } = useContext(WorkspaceContext);
  const inputTitleRef = useRef();

  function handleTitleChange(e) {
    setTask({
      ...task,
      title: e.target.value,
    });
  }

  function handleUpdateTitle() {
    const title = task.title.trim();

    if (title === '') {
      setTask(taskModal);
      return;
    }

    if (title === taskModal.title) {
      return;
    }

    updateTask(task, { title });
  }

  return (
    <div className='task-modal-header'>
      {task.cover && (
        <img
          src={task.cover}
          alt='cover'
          className='task-modal-header__cover'
        />
      )}

      <div className='task-modal-header__wrapper'>
        <span className='task-modal-header__title-icon'>
          <FaPager size={24} />
        </span>

        <div className='task-modal-header__title-container'>
          <input
            className='task-modal-header__title'
            value={task.title}
            placeholder=''
            ref={inputTitleRef}
            onChange={handleTitleChange}
            onBlur={handleUpdateTitle}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                inputTitleRef.current.blur();
              }
            }}
          />

          <span className='task-modal-header__status'>
            in status{' '}
            <span>
              {
                workspace.statuses.find(status => status.id === task.statusId)
                  ?.title
              }
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
