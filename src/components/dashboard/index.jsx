import React from 'react';
import '../../styles/pages/dashboard.css';
import AllTasksListView from './allTasksListView';
import AllWorkspacesListView from './allWorkspacesListView';
import FavoriteWorkspacesListView from './favoriteWorkspacesListView';
import OwnWorkspacesListView from './ownWorkspacesListView';
// import { WorkspaceListView } from './workspaceList';
// import { TasksListView } from './tasklistView';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      {/* <WorkspaceListView /> */}
      {/* <TaskListView /> */}
      <OwnWorkspacesListView />
      <AllWorkspacesListView />
      <FavoriteWorkspacesListView />
      <AllTasksListView />
    </div>
  );
}
