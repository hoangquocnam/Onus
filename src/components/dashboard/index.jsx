import { DashboardProvider } from '../../stores/dashboard';
import '../../styles/pages/dashboard.css';
import AllTasksListView from './allTasksListView';
import AllWorkspacesListView from './allWorkspacesListView';
import FavoriteWorkspacesListView from './favoriteWorkspacesListView';
import OwnWorkspacesListView from './ownWorkspacesListView';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className='dashboard'>
        <OwnWorkspacesListView />
        <AllWorkspacesListView />
        <FavoriteWorkspacesListView />
        <AllTasksListView />
      </div>
    </DashboardProvider>
  );
}
