import { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../routes';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/workspaceDeletePopover.css';
import { PopoverButton, PopoverContainer } from '../../popover';

export default function WorkspaceDeletePopover({ children }) {
  const { deleteWorkspace, isOwner, leaveWorkspace } =
    useContext(WorkspaceContext);
  const navigate = useNavigate();

  async function onClick() {
    try {
      if (isOwner) {
        await deleteWorkspace();
      } else {
        await leaveWorkspace();
      }

      navigate(routes.home.path, {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
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
            maxWidth: '320px',
            width: '100%',
          }}
        >
          <div className='task-delete-popover'>
            <p className='task-delete-popover__text'>
              {isOwner
                ? 'Are you sure you want to delete this workspace?'
                : 'Are you sure you want to leave this workspace?'}
            </p>

            <PopoverButton
              variant='danger'
              align='center'
              closedOnClick={true}
              onClick={onClick}
            >
              {isOwner ? 'Delete' : 'Leave'}
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
