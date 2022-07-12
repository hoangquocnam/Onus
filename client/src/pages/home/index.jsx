import { Outlet } from "react-router-dom";
import { TopBar } from "../../components";
import "../../styles/pages/homePage.css";

export default function HomePage() {
  return (
    <div className="page-container">
      <TopBar />

      <div className="page-container__body">
        <Outlet />
      </div>
    </div>
  );
}
