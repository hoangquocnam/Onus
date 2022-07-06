import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, TopBar, Workspace, UserProfile } from "../../components";
import routes from "../../routes";
import "../../styles/pages/homePage.css";

export default function HomePage() {
  return (
    <React.StrictMode>
      <div className="page-container">
        <TopBar />

        <div className="page-container__body">
          <Routes>
            <Route
              path={routes.home.path}
              element={<Navigate to={routes.dashboard.path} />}
            />

            <Route
              path={routes.login.path}
              element={<Navigate to={routes.home.path} />}
            ></Route>

            <Route path={routes.dashboard.path} element={<Dashboard />}></Route>

            <Route path={routes.workspaces.path} element={<Workspace />}></Route>
            <Route path={routes.workspaces.workspace} element={<Workspace />}></Route>

            <Route path={routes.account.path} element={<UserProfile />}></Route>

          </Routes>
        </div>
      </div>
    </React.StrictMode>
  );
}
