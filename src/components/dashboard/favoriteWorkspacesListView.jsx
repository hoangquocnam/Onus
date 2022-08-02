import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { DashboardContext } from '../../stores/dashboard';
import ListView from '../listView';
import ListViewCard from '../listView/listViewCard';

function FavoriteWorkspacesListView() {
  const navigate = useNavigate();
  const { favoriteWorkspaces, isLoadingFavoriteWorkspaces } =
    useContext(DashboardContext);

  function navigateToWorkspace(workspaceId) {
    navigate(`${routes.workspaces.path}/${workspaceId}`);
  }

  return (
    <ListView
      title='Favorite workspaces'
      isLoading={isLoadingFavoriteWorkspaces}
    >
      {favoriteWorkspaces?.map(workspace => (
        <ListViewCard
          key={workspace.id}
          data={workspace}
          onClick={() => navigateToWorkspace(workspace.id)}
        />
      ))}
    </ListView>
  );
}

export default FavoriteWorkspacesListView;
