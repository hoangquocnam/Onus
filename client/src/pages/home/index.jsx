import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../../routes";
import { Dashboard } from "../../components";

export default function HomePage() {
  return (
    <React.StrictMode>
      <div className="homePage__container">
        <div className="homePage__header"></div>

        <div className="homePage__body">
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
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  );
}
