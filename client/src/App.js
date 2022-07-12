import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dashboard,
  ProtectedRoutes,
  PublicRoutes,
  UserProfile,
  Workspace,
} from "./components";
import { HomePage, LogInPage, SignUpPage } from "./pages";
import routes from "./routes";
import { AccountProvider } from "./stores/account";

const App = () => {
  return (
    <>
      <AccountProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path={routes.home.path} element={<HomePage />}>
              <Route
                path={routes.home.path}
                element={<Navigate to={routes.dashboard.path} replace />}
              />
              <Route path={routes.dashboard.path} element={<Dashboard />} />
              <Route path={routes.account.path} element={<UserProfile />} />
              <Route path={routes.workspaces.path} element={<Workspace />} />
              <Route
                path={routes.workspaces.workspace.path}
                element={<Workspace />}
              />
            </Route>
          </Route>

          <Route element={<PublicRoutes />}>
            <Route path={routes.login.path} element={<LogInPage />} />
            <Route path={routes.signUp.path} element={<SignUpPage />} />
          </Route>
        </Routes>
      </AccountProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={4}
      />
    </>
  );
};

export default App;
