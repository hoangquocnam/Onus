import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dashboard,
  ProtectedRoutes,
  PublicRoutes,
  UserProfile,
  Workspace,
} from './components';
import {
  AboutPage,
  HomePage,
  LogInPage,
  NotFoundPage,
  SignUpPage,
} from './pages';
import routes from './routes';
import { AccountProvider } from './stores/account';
import { WorkspaceProvider } from './stores/workspace';

const App = () => {
  return (
    <>
      <AccountProvider>
        <WorkspaceProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path={routes.home.path} element={<HomePage />}>
                <Route
                  path={routes.home.path}
                  element={<Navigate to={routes.dashboard.path} replace />}
                />

                <Route path={routes.dashboard.path} element={<Dashboard />} />

                <Route
                  path={routes.account.profile}
                  element={<UserProfile />}
                />

                <Route path={routes.account.path} element={<UserProfile />} />

                <Route path={routes.workspaces.path} element={<Workspace />} />

                <Route
                  path={routes.workspaces.workspace.path}
                  element={<Workspace />}
                />

                <Route path={routes.about.path} element={<AboutPage />} />
              </Route>
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path={routes.login.path} element={<LogInPage />} />
              <Route path={routes.signUp.path} element={<SignUpPage />} />
            </Route>

            <Route path={routes.notFound.path} element={<NotFoundPage />} />
            <Route
              path='*'
              element={<Navigate to={routes.notFound.path} replace />}
            />
          </Routes>
        </WorkspaceProvider>
      </AccountProvider>

      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={4}
      />
    </>
  );
};

export default App;
