import { useContext, useRef, useState } from 'react';
import { FaBars, FaComments, FaStream } from 'react-icons/fa';
import TextareaAutosize from 'react-textarea-autosize';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskModalContent.css';
import MemberAvatarList from '../../memberAvatarList';

export default function TaskModalContent({ task, setTask }) {
  const { taskModal, updateTask } = useContext(WorkspaceContext);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const inputDescriptionRef = useRef(null);

  function toggleEdit() {
    if (!isEditingDescription) {
      inputDescriptionRef.current.select();
      inputDescriptionRef.current.focus();
    }

    setIsEditingDescription(!isEditingDescription);
  }

  function handleInputChange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdateTask(task) {
    try {
      updateTask(task);
    } catch (error) {
      console.error('task modal error line 60');
    }
  }

  function handleUpdateDescription() {
    const description = task.description.trim();
    handleUpdateTask({ ...task, description });
    setIsEditingDescription(false);
  }

  function handleCancelUpdateDescription() {
    toggleEdit();
    setTask(taskModal);
  }

  return (
    <div className='task-modal-content'>
      {task.members?.length > 0 && (
        <div className='task-modal-content__members'>
          <h4 className='task-modal-content__members-title'>Members</h4>

          <MemberAvatarList
            limit={20}
            container={{
              type: 'task',
              object: task,
            }}
            allowRemove={true}
          />
        </div>
      )}

      <div className='task-modal-content__module'>
        <div className='task-modal-content__module-header'>
          <span className='task-modal-content__module-icon'>
            <FaBars size={24} />
          </span>

          <div className='task-modal-content__module-title-wrapper'>
            <h3 className='task-modal-content__module-title'>Description</h3>

            {!isEditingDescription && task.description !== '' && (
              <button
                type='button'
                className='task-modal-content__module-btn'
                onClick={toggleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className='task-modal-content__module-content'>
          <div className='task-modal-content__description-wrapper'>
            <TextareaAutosize
              ref={inputDescriptionRef}
              className={`task-modal-content__description ${
                isEditingDescription
                  ? 'task-modal-content__description--active'
                  : ''
              }`}
              placeholder='Add a more detailed description...'
              value={task.description}
              name='description'
              onChange={handleInputChange}
              onFocus={toggleEdit}
              minRows={4}
            />

            {isEditingDescription && (
              <div className='task-modal-content__description-group-btn'>
                <button
                  type='button'
                  className='task-modal-content__description-save-btn'
                  onClick={handleUpdateDescription}
                >
                  Save
                </button>

                <button
                  type='button'
                  className='task-modal-content__description-cancel-btn'
                  onClick={handleCancelUpdateDescription}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='task-modal-content__module'>
        <div className='task-modal-content__module-header'>
          <span className='task-modal-content__module-icon'>
            <FaComments size={24} />
          </span>

          <div className='task-modal-content__module-title-wrapper'>
            <h3 className='task-modal-content__module-title'>Comments</h3>
          </div>
        </div>

        <div className='task-modal-content__module-content'></div>
      </div>

      <div className='task-modal-content__module'>
        <div className='task-modal-content__module-header'>
          <span className='task-modal-content__module-icon'>
            <FaStream size={24} />
          </span>

          <div className='task-modal-content__module-title-wrapper'>
            <h3 className='task-modal-content__module-title'>Activities</h3>

            <button type='button' className='task-modal-content__module-btn'>
              Show details
            </button>
          </div>
        </div>

        <div className='task-modal-content__module-content'></div>
      </div>
    </div>
  );
}
