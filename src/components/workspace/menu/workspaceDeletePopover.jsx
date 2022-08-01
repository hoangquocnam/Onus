import { OverlayTrigger } from 'react-bootstrap';
import '../../../styles/components/workspaceDeletePopover.css';
import { PopoverButton, PopoverContainer } from '../../popover';

export default function WorkspaceDeletePopover({ children }) {
  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom-start'
      overlay={
        <PopoverContainer
          title='Delete'
          style={{
            maxWidth: '320px',
            width: '100%',
          }}
        >
          <div className='task-delete-popover'>
            <p className='task-delete-popover__text'>
              Are you sure you want to delete this workspace?
            </p>

            <PopoverButton variant='danger' align='center' closedOnClick={true}>
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
