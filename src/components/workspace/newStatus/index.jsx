import { useContext, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useOutsideAlerter } from '../../../hooks';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/newStatus.css';

export default function NewStatus() {
  const { addStatus } = useContext(WorkspaceContext);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const inputTitleRef = useRef(null);

  const ref = useRef(null);
  useOutsideAlerter(ref, handleInactive);

  function handleCreateNewStatus(e) {
    e.preventDefault();

    if (title.trim() === '') {
      setTitle('');
      inputTitleRef.current.focus();
      toast.error('Title is required');
      return;
    }

    try {
      addStatus(title.trim());
    } catch (error) {
      toast.error(error.response.data.error.message);
    }

    setTitle('');
    setIsActive(false);
  }

  function handleOnTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleInactive() {
    setIsActive(false);
    setTitle('');
  }

  if (!isActive) {
    return (
      <div className='new-status'>
        <div
          className='new-status--inactive disable-user-select'
          onClick={() => setIsActive(true)}
        >
          + Add new status
        </div>
      </div>
    );
  }

  return (
    <div className='new-status'>
      <div ref={ref} className='new-status--active'>
        <form onSubmit={handleCreateNewStatus}>
          <input
            type='text'
            className='new-status__input-title'
            placeholder='Enter a title for this status...'
            autoFocus={true}
            value={title}
            onChange={handleOnTitleChange}
            ref={inputTitleRef}
            maxLength={50}
          />

          <div className='new-status__group-btn'>
            <button type='submit' className='new-status__btn-add'>
              Add status
            </button>
            <div className='new-status__btn-cancel' onClick={handleInactive}>
              <FaTimes />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
