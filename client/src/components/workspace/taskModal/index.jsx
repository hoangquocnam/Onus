import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RiCloseFill } from 'react-icons/ri';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskModal.css';
import TaskModalContent from './taskModalContent';
import TaskModalHeader from './taskModalHeader';
import TaskModalSidebar from './taskModalSidebar';

export default function TaskModal() {
  const { taskModal, setTaskModal } = useContext(WorkspaceContext);
  const [task, setTask] = useState(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (taskModal) {
      setTask(taskModal);
      setIsOpening(true);
    } else {
      setIsOpening(false);
    }
  }, [taskModal]);

  function handleOnClose() {
    setIsOpening(false);
  }

  function handleOnExited() {
    setTaskModal(null);
  }

  return (
    <Modal
      size='lg'
      show={isOpening}
      enforceFocus={false}
      onHide={handleOnClose}
      onExited={handleOnExited}
      centered
    >
      {task && (
        <div className='task-modal'>
          <TaskModalHeader task={task} setTask={setTask} />

          <div className='task-modal__close-btn' onClick={handleOnClose}>
            <RiCloseFill size={30} />
          </div>

          <div className='task-modal__body'>
            <TaskModalContent task={task} setTask={setTask} />
            <TaskModalSidebar task={task} setTask={setTask} />
          </div>
        </div>
      )}
    </Modal>
  );
}
