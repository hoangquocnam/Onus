import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ListView from './listView';
import ListViewCard from './listView/listViewCard';
import ListViewNewCard from './listView/listViewNewCard';
import NewWorkspaceModal from './newWorkspaceModal';

function OwnWorkspacesListView() {
  const navigate = useNavigate();
  const [ownWorkspaces, setOwnWorkspaces] = useState(null);
  const [isNewWorkspaceModalOpening, setIsNewWorkspaceModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOwnWorkspaces(require('../../data/dashboard.json').ownWorkspaces);
      setIsLoading(false);
    }, Math.floor(Math.random() * 3000 + 1000));
  }, []);

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
      <ListView title='Your workspaces' isLoading={isLoading}>
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
