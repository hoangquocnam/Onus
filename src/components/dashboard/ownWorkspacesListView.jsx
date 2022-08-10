import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { DashboardContext } from '../../stores/dashboard';
import ListView from '../listView';
import ListViewCard from '../listView/listViewCard';
import ListViewNewCard from '../listView/listViewNewCard';
import NewWorkspaceModal from './newWorkspaceModal';

function OwnWorkspacesListView() {
  const navigate = useNavigate();
  const [isNewWorkspaceModalOpening, setIsNewWorkspaceModalOpen] =
    useState(false);
  const { ownWorkspaces, isLoadingOwnWorkspaces, setOwnWorkspaces } =
    useContext(DashboardContext);

  function navigateToWorkspace(workspaceId) {
    navigate(`${routes.workspaces.path}/${workspaceId}`);
  }

  function handleNewWorkspaceClick() {
    setIsNewWorkspaceModalOpen(true);
  }

  function onAfterCreatedNewWorkspace(data) {
    setOwnWorkspaces([...ownWorkspaces, data]);
    setIsNewWorkspaceModalOpen(false);
  }

  return (
    <>
      <ListView title='Your workspaces' isLoading={isLoadingOwnWorkspaces}>
        {ownWorkspaces?.map(workspace => (
          <ListViewCard
            key={workspace.id}
            data={workspace}
            onClick={() => navigateToWorkspace(workspace.id)}
          />
        ))}

        <ListViewNewCard
          title='Create new workspace'
          onClick={handleNewWorkspaceClick}
        />
      </ListView>

      <NewWorkspaceModal
        isOpen={isNewWorkspaceModalOpening}
        setIsOpen={setIsNewWorkspaceModalOpen}
        onAfterCreatedNewWorkspace={onAfterCreatedNewWorkspace}
      />
    </>
  );
}

export default OwnWorkspacesListView;
