import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { DashboardContext } from '../../stores/dashboard';
import ListView from '../listView';
import ListViewCard from '../listView/listViewCard';

function AllTasksListView() {
  const navigate = useNavigate();
  const { allTasks, isLoadingAllTasks } = useContext(DashboardContext);

  function navigateToTask(workspaceId, taskId) {
    navigate(`${routes.workspaces.path}/${workspaceId}?taskId=${taskId}`);
  }

  return (
    <ListView title='All tasks' isLoading={isLoadingAllTasks}>
      {allTasks?.map(task => (
        <ListViewCard
          key={task.id}
          data={task}
          onClick={() => navigateToTask(task.workspaceId, task.id)}
        />
      ))}
    </ListView>
  );
}

export default AllTasksListView;
