import React from 'react';
import '../../styles/pages/dashboard.css';
// import { TasksListView } from './tasklistView';
import { useEffect, useState } from 'react';
import Spinner from '../spinner';
import AllTasksListView from './allTasksListView';
import AllWorkspacesListView from './allWorkspacesListView';
import FavoriteWorkspacesListView from './favoriteWorkspacesListView';
import OwnWorkspacesListView from './ownWorkspacesListView';
// import { WorkspaceListView } from './workspaceList';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(require('../../data/dashboard.json'));
  }, [data]);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      {/* <WorkspaceListView /> */}
      <OwnWorkspacesListView />
      <AllWorkspacesListView />
      <FavoriteWorkspacesListView />
      <AllTasksListView />
    </div>
  );
}
