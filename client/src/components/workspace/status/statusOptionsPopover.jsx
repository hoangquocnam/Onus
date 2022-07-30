import { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/statusOptionsPopover.css';
import {
  PopoverButton,
  PopoverContainer,
  PopoverSeparator,
} from '../../popover';

export default function StatusOptionsPopover({
  status,
  setIsActiveNewTask,
  setIsEditingTitle,
  children,
}) {
  const { deleteStatus } = useContext(WorkspaceContext);

  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom-start'
      overlay={
        <PopoverContainer
          title='Status options'
          style={{
            maxWidth: '240px',
            width: '100%',
          }}
        >
          <div className='status-options-popover'>
            <PopoverButton
              variant='ghost'
              align='left'
              closedOnClick={true}
              onClick={() => setIsEditingTitle(true)}
            >
              Rename
            </PopoverButton>
            <PopoverButton
              variant='ghost'
              align='left'
              closedOnClick={true}
              onClick={() => setIsActiveNewTask(true)}
            >
              Add task...
            </PopoverButton>
            <PopoverSeparator />

            <PopoverButton
              variant='ghost-danger'
              closedOnClick={true}
              onClick={() => deleteStatus(status)}
            >
              Delete
            </PopoverButton>
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
