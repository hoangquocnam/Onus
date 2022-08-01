import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ListView from './listView';
import ListViewCard from './listView/listViewCard';

function FavoriteWorkspacesListView() {
  const navigate = useNavigate();
  const [favoriteWorkspaces, setFavoriteWorkspaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFavoriteWorkspaces(
        require('../../data/dashboard.json').favoriteWorkspaces,
      );
      setIsLoading(false);
    }, Math.floor(Math.random() * 3000 + 1000));
  }, []);

  function navigateToWorkspace(workspaceId) {
    navigate(`${routes.workspaces.path}/${workspaceId}`);
  }

  return (
    <>
      <ListView title='Favorite workspaces' isLoading={isLoading}>
        {favoriteWorkspaces?.map(workspace => (
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

export default FavoriteWorkspacesListView;
