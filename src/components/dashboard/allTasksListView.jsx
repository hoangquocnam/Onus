import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import ListView from './listView';
import ListViewCard from './listView/listViewCard';

function AllTasksListView() {
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAllTasks(require('../../data/dashboard.json').allTasks);
      setIsLoading(false);
    }, Math.floor(Math.random() * 3000 + 1000));
  }, []);

  function navigateToTask(workspaceId, taskId) {
    navigate(`${routes.workspaces.path}/${workspaceId}?taskId=${taskId}`);
  }

  return (
    <>
      <ListView title='All tasks' isLoading={isLoading}>
        {allTasks?.map(task => (
          <ListViewCard
            key={task.id}
            data={task}
            onClick={() => navigateToTask(task.workspaceId, task.id)}
          />
        ))}
      </ListView>
    </>
  );
}

export default AllTasksListView;
