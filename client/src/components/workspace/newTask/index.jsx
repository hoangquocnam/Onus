import { useContext, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useOutsideAlerter } from '../../../hooks';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/newTask.css';

export default function NewTask({ statusId, isActive, setIsActive }) {
  const { addTask } = useContext(WorkspaceContext);
  const [title, setTitle] = useState('');
  const inputTitleRef = useRef(null);

  const ref = useRef(null);
  useOutsideAlerter(ref, handleInactive);

  function handleCreateNewTask(e) {
    e.preventDefault();

    if (title.trim() === '') {
      inputTitleRef.current.focus();
      toast.error('Title is required');
      setTitle('');
      return;
    }

    addTask(title.trim(), statusId);

    setTitle('');
    setIsActive(false);
  }

  function handleOnTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleActive() {
    setIsActive(true);
  }

  function handleInactive() {
    setIsActive(false);
    setTitle('');
  }

  if (!isActive) {
    return (
      <div
        className='new-task--inactive disable-user-select'
        onClick={handleActive}
      >
        + Add new task
      </div>
    );
  }

  return (
    <div ref={ref} className='new-task--active'>
      <form onSubmit={handleCreateNewTask}>
        <input
          type='text'
          className='new-task__title'
          placeholder='Enter a title for this task...'
          autoFocus={true}
          value={title}
          onChange={handleOnTitleChange}
          ref={inputTitleRef}
        />

        <div className='new-task__group-btn'>
          <button type='submit' className='new-task__add-btn'>
            Add task
          </button>
          <div className='new-task__cancel-btn' onClick={handleInactive}>
            <FaTimes />
          </div>
        </div>
      </form>
    </div>
  );
}
