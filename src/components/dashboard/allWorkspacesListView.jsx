import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ListView from './listView';
import ListViewCard from './listView/listViewCard';

function AllWorkspacesListView() {
  const navigate = useNavigate();
  const [allWorkspaces, setAllWorkspaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAllWorkspaces(require('../../data/dashboard.json').allWorkspaces);
      setIsLoading(false);
    }, Math.floor(Math.random() * 3000 + 1000));
  }, []);

  function navigateToWorkspace(workspaceId) {
    navigate(`${routes.workspaces.path}/${workspaceId}`);
  }

  return (
    <>
      <ListView title='All workspaces' isLoading={isLoading}>
        {allWorkspaces?.map(workspace => (
          <ListViewCard
            key={workspace.id}
            data={workspace}
            onClick={() => navigateToWorkspace(workspace.id)}
          />
        ))}
      </ListView>
    </>
  );
}

export default AllWorkspacesListView;
