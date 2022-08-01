import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { randInt } from '../../utils/common';
import ListView from '../listView';
import ListViewCard from '../listView/listViewCard';

function AllWorkspacesListView() {
  const navigate = useNavigate();
  const [allWorkspaces, setAllWorkspaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAllWorkspaces(require('../../data/dashboard.json').allWorkspaces);
      setIsLoading(false);
    }, randInt(1000, 3000));
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
