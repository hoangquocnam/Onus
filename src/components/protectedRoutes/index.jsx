import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../../components/spinner";
import { useAccount } from "../../hooks";
import routes from "../../routes";

function ProtectedRoutes() {
  const { account, isAuthenticating } = useAccount();

  if (isAuthenticating) {
    return <Spinner />;
  }

  if (!account) {
    return <Navigate to={routes.login.path} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
