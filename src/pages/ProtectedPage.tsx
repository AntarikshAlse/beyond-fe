import { Navigate, Outlet } from "react-router";

type Props = {
  isAuthenticated: boolean;
};

const ProtectedPage = ({ isAuthenticated }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;
