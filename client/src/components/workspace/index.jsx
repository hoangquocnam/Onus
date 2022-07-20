import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Container } from 'react-smooth-dnd';
import { toast } from 'react-toastify';
import { useOutsideAlerter } from '../../hooks';
import '../../styles/pages/workspace.css';
import WorkspaceHeader from './workspaceHeader';
import WorkspaceMenuTab from './workspaceMenuTab';
import TaskList from './workspaceTaskList';
import { useParams } from 'react-router-dom';

function Workspace() {
  const [workspace, setWorkspace] = useState(null);
  const [taskLists, setTaskLists] = useState(null);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [recentAddedTaskTaskListIndex, setRecentUpdatedTaskListIndex] =
    useState(null);

  const { id } = useParams();

  useEffect(() => {
    const data = require('../../data/workspace.json');

    setWorkspace(data);
    setTaskLists(data.lists);
  }, []);

  function toggleMenuTab() {
    setIsShowMenu(!isShowMenu);
  }

  function addNewTaskList(title) {
    setTaskLists([
      ...taskLists,
      {
        id: Date.now(),
        title,
        tasks: [],
        order: taskLists.length,
      },
    ]);
  }

  function addNewTask(taskListIndex, title) {
    const newTaskLists = [...taskLists];

    newTaskLists[taskListIndex].tasks.push({
      id: Date.now(),
      title,
      description: '',
      cover: null,
      labels: [],
      members: [],
      order: newTaskLists[taskListIndex].tasks.length,
    });

    setRecentUpdatedTaskListIndex(taskListIndex);

    setTaskLists(newTaskLists);
  }

  function onTaskListDrop(result) {
    let newTaskLists = [...taskLists];
    const [removed] = newTaskLists.splice(result.removedIndex, 1);
    newTaskLists.splice(result.addedIndex, 0, removed);
    setTaskLists(newTaskLists);
  }

  function onTaskDrop(taskListID, result) {
    if (result.removedIndex === null && result.addedIndex === null) {
      return;
    }

    const index = taskLists.findIndex(taskList => taskList.id === taskListID);
    const newTaskList = { ...taskLists[index] };

    if (result.removedIndex !== null) {
      newTaskList.tasks.splice(result.removedIndex, 1);
    }

    if (result.addedIndex !== null) {
      newTaskList.tasks.splice(result.addedIndex, 0, result.payload);
    }

    const newTaskLists = [...taskLists];
    newTaskLists[index] = newTaskList;

    setTaskLists(newTaskLists);
  }

  if (!workspace) {
    return null;
  }

  return (
    <div className='workspace-container'>
      <div className='workspace-main'>
        <WorkspaceHeader showMenu={toggleMenuTab} workspace={workspace} />

        <div className='workspace-body'>
          <div className='workspace-content'>
            <Container
              orientation='horizontal'
              onDrop={onTaskListDrop}
              dragHandleSelector='.workspace-list-draggable-handle'
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: 'workspace-list-drop-preview',
              }}
            >
              {taskLists?.map((taskList, index) => (
                <TaskList
                  key={taskList.id}
                  taskList={taskList}
                  onTaskDrop={onTaskDrop}
                  addNewTask={addNewTask}
                  index={index}
                  recentAddedTask={recentAddedTaskTaskListIndex === index}
                />
              ))}
            </Container>

            <div className='workspace-new-list-container'>
              <NewTaskList onCreate={addNewTaskList} />
            </div>
          </div>
        </div>
      </div>

      <WorkspaceMenuTab isShow={isShowMenu} />
    </div>
  );
}

function NewTaskList(props) {
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

    props.onCreate(title);

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
        className='workspace__new-list--inactive disable-user-select'
        onClick={() => setIsActive(true)}
      >
        + Add new list
      </div>
    );
  }

  return (
    <div ref={ref} className='workspace__new-list--active'>
      <form onSubmit={handleCreateNewTask}>
        <input
          type='text'
          className='workspace-new-list__input-title'
          placeholder='Enter a title for this list...'
          autoFocus={true}
          value={title}
          onChange={handleOnTitleChange}
          ref={inputTitleRef}
          maxLength={50}
        />

        <div className='workspace-new-list__group-btn'>
          <button type='submit' className='workspace-new-list__btn-add'>
            Add list
          </button>
          <div
            className='workspace-new-list__btn-cancel'
            onClick={handleInactive}
          >
            <FaTimes />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Workspace;
