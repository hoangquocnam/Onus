import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { DashboardContext } from '../../stores/dashboard';
import ListView from '../listView';
import ListViewCard from '../listView/listViewCard';

function AllWorkspacesListView() {
  const navigate = useNavigate();
  const { allWorkspaces, isLoadingAllWorkspaces } =
    useContext(DashboardContext);

  function navigateToWorkspace(workspaceId) {
    navigate(`${routes.workspaces.path}/${workspaceId}`);
  }

  return (
    <ListView title='All workspaces' isLoading={isLoadingAllWorkspaces}>
      {allWorkspaces?.map(workspace => (
        <ListViewCard
          key={workspace.id}
          data={workspace}
          onClick={() => navigateToWorkspace(workspace.id)}
        />
      ))}
    </ListView>
  );
}

export default AllWorkspacesListView;
