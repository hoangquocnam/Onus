import { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { Container, Draggable } from 'react-smooth-dnd';
import { toast } from 'react-toastify';
import { useOutsideAlerter } from '../../hooks';
import '../../styles/components/workspaceTaskList.css';
import Task from './workspaceTask';

function TaskList(props) {
  const dummyDivRef = useRef(null);

  function scrollToBottom() {
    if (dummyDivRef.current) {
      dummyDivRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    if (props.recentAddedTask) {
      scrollToBottom();
    }
  }, [props.recentAddedTask]);

  return (
    <Draggable>
      <div className='workspace-list'>
        <div className='workspace-list__header disable-user-select workspace-list-draggable-handle'>
          <h4 className='workspace-list__title'>{props.taskList.title}</h4>
          <div className='workspace-list__options'>
            <BsThreeDots size={30} fill='#CDCCCA' />
          </div>
        </div>

        <div className='workspace-list__tasks'>
          <Container
            orientation='vertical'
            groupName='column'
            onDrop={result => props.onTaskDrop(props.taskList.id, result)}
            getChildPayload={index => props.taskList.tasks[index]}
            dragClass='workspace-list__task-drag'
            dropClass='workspace-list__task-drop'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'workspace-list__task-drop-preview',
            }}
          >
            {props.taskList.tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </Container>

          <div ref={dummyDivRef} />
        </div>

        <NewTask
          index={props.index}
          addNewTask={props.addNewTask}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </Draggable>
  );
}

function NewTask(props) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const inputTitleRef = useRef(null);

  const ref = useRef(null);
  useOutsideAlerter(ref, () => setIsActive(false));

  function handleCreateNewTask(e) {
    e.preventDefault();

    if (title.length === 0) {
      inputTitleRef.current.focus();
      toast.error('Title is required');
      return;
    }

    props.addNewTask(props.index, title);

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
      <div
        className='workspace-list__new-task--inactive disable-user-select'
        onClick={() => setIsActive(true)}
      >
        + Add new card
      </div>
    );
  }

  return (
    <div ref={ref} className='workspace-list__new-task--active'>
      <form onSubmit={handleCreateNewTask}>
        <input
          type='text'
          className='workspace-list-new-task__input-title'
          placeholder='Enter a title for this card...'
          autoFocus={true}
          value={title}
          onChange={handleOnTitleChange}
          ref={inputTitleRef}
        />

        <div className='workspace-list-new-task__group-btn'>
          <button type='submit' className='workspace-list-new-task__add-btn'>
            Add card
          </button>
          <div
            className='workspace-list-new-task__cancel-btn'
            onClick={handleInactive}
          >
            <FaTimes />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskList;
