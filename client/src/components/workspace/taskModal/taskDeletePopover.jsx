import { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskDeletePopover.css';
import { PopoverButton, PopoverContainer } from '../../popover';

export default function TaskDeletePopover({ task, children }) {
  const { deleteTask } = useContext(WorkspaceContext);

  function handleDeleteTask() {
    deleteTask(task);
  }

  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom-start'
      overlay={
        <PopoverContainer
          title='Delete'
          style={{
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <div className='task-delete-popover'>
            <p className='task-delete-popover__text'>
              Are you sure you want to delete this task?
            </p>

            <PopoverButton
              onClick={handleDeleteTask}
              variant='danger'
              align='center'
              closedOnClick={true}
            >
              Delete
            </PopoverButton>
            <PopoverButton align='center' closedOnClick={true}>
              Cancel
            </PopoverButton>
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
