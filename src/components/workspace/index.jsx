import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-smooth-dnd';
import { toast } from 'react-toastify';
import { Spinner } from '../../components';
import routes from '../../routes';
import { WorkspaceContext } from '../../stores/workspace';
import '../../styles/pages/workspace.css';
import WorkspaceHeader from './header';
import WorkspaceInviteModal from './inviteModal';
import WorkspaceMenu from './menu';
import NewStatus from './newStatus';
import Status from './status';
import WorkspaceTaskModal from './taskModal';

export default function Workspace() {
  const { id } = useParams();
  const {
    workspace,
    getWorkspace,
    updateStatusListOfWorkspace,
    resetWorkspace,
  } = useContext(WorkspaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id === undefined || id === null) {
        navigate(routes.home.path, {
          replace: true,
        });
      } else {
        try {
          await getWorkspace(id);
        } catch (error) {
          toast.error(error.response.data.error.message);
          navigate(routes.notFound.path, {
            replace: true,
          });
        }
      }
    })();

    return () => {
      resetWorkspace();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!workspace) {
    return <Spinner />;
  }

  function handleOnStatusDrop(result) {
    const statuses = [...workspace.statuses];
    const [removed] = statuses.splice(result.removedIndex, 1);
    statuses.splice(result.addedIndex, 0, removed);

    updateStatusListOfWorkspace(statuses);
  }

  return (
    <div className='workspace'>
      <div className='workspace-main'>
        <WorkspaceHeader />

        <div className='workspace-body'>
          <div className='workspace-content'>
            {workspace?.statuses.length > 0 && (
              <Container
                orientation='horizontal'
                onDrop={handleOnStatusDrop}
                dragHandleSelector='.status-draggable-handle'
                nonDragAreaSelector='.status-none-draggable-handle'
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'status-drop-preview',
                }}
              >
                {workspace.statuses?.map(status => (
                  <Status key={status.id} status={status} />
                ))}
              </Container>
            )}

            <NewStatus />
          </div>
        </div>
      </div>

      <WorkspaceMenu />
      <WorkspaceTaskModal />
      <WorkspaceInviteModal />
    </div>
  );
}
