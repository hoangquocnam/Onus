import { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Container, Draggable } from 'react-smooth-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/status.css';
import { scrollToRef } from '../../../utils/common.js';
import NewTask from '../newTask';
import Task from '../task';
import StatusOptionsPopover from './statusOptionsPopover';

export default function Status({ status }) {
  const {
    workspace,
    recentStatusAddedTask,
    setRecentStatusAddedTask,
    updateStatus,
    updateMovingTask,
    taskMoveFrom,
    taskMoveTo,
  } = useContext(WorkspaceContext);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(status.title);
  let titleRef = null;

  const dummyDivRef = useRef(null);
  const [isActiveNewTask, setIsActiveNewTask] = useState(false);

  useEffect(() => {
    if (isEditingTitle) {
      titleRef.select();
      titleRef.focus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingTitle]);

  function handleUpdateTitle() {
    setIsEditingTitle(false);
    window?.getSelection().removeAllRanges();

    if (title.trim() === '') {
      setTitle(status.title);
      return;
    }

    if (title.trim() === status.title) {
      return;
    }

    updateStatus(status.id, { title: title.trim() });
  }

  function handleOnTaskDrop(statusId, result) {
    if (result.removedIndex === null && result.addedIndex === null) {
      return;
    }

    const statusIndex = workspace.statuses.findIndex(s => s.id === statusId);
    // const newStatus = { ...workspace.statuses[statusIndex] };

    // if (result.removedIndex !== null && result.addedIndex !== null) {
    //   countRef.current += 2;
    //   console.log(countRef.current);
    //   return;
    // }

    if (result.removedIndex !== null) {
      taskMoveFrom.current = {
        statusIndex,
        taskIndex: result.removedIndex,
      };

      // newStatus.tasks.splice(result.removedIndex, 1);
    }

    if (result.addedIndex !== null) {
      taskMoveTo.current = {
        statusIndex,
        taskIndex: result.addedIndex,
      };

      // result.payload.statusId = statusId;
      // newStatus.tasks.splice(result.addedIndex, 0, result.payload);
    }

    if (taskMoveFrom.current && taskMoveTo.current) {
      updateMovingTask();
    }

    // don't delete
    // setRecentStatusAddedTask({ id: statusId });

    // const statuses = [...workspace.statuses];
    // statuses[statusIndex] = newStatus;

    // setWorkspace({ ...workspace, statuses });

    // if (taskMoveRef.current.count === 2) {
    //   console.log('run');
    //   taskMoveRef.current.count = 0;
    // }
    // updateWorkspace({ ...workspace, statuses });
  }

  useEffect(() => {
    if (recentStatusAddedTask?.id === status.id) {
      scrollToRef(dummyDivRef);
      setRecentStatusAddedTask(null);
    }
  }, [recentStatusAddedTask, setRecentStatusAddedTask, status]);

  return (
    <Draggable>
      <div className='status'>
        <div className='status__header disable-user-select status-draggable-handle'>
          <div className='status__title-wrapper'>
            <TextareaAutosize
              className={`status__title ${
                isEditingTitle ? 'status-none-draggable-handle' : ''
              }`}
              value={title}
              placeholder=''
              onChange={e => setTitle(e.target.value)}
              disabled={!isEditingTitle}
              ref={tag => (titleRef = tag)}
              onBlur={handleUpdateTitle}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleUpdateTitle();
                }
              }}
            />
          </div>

          <div>
            <StatusOptionsPopover
              status={status}
              setIsActiveNewTask={setIsActiveNewTask}
              setIsEditingTitle={setIsEditingTitle}
            >
              <div className='status__options'>
                <BsThreeDots size={30} fill='#CDCCCA' />
              </div>
            </StatusOptionsPopover>
          </div>
        </div>

        <div className='status__tasks'>
          <Container
            orientation='vertical'
            groupName='tasks'
            onDrop={result => handleOnTaskDrop(status.id, result)}
            getChildPayload={index => status.tasks[index]}
            dragClass='status__task-drag'
            dropClass='status__task-drop'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'task-drop-preview',
            }}
          >
            {status.tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </Container>

          <div ref={dummyDivRef} />
        </div>

        <NewTask
          statusId={status.id}
          isActive={isActiveNewTask}
          setIsActive={setIsActiveNewTask}
        />
      </div>
    </Draggable>
  );
}
