import { useNavigate } from 'react-router-dom';
import { useSelector } from '../services/store';
import { getIsAuth } from '../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthChecked = useSelector(getIsAuth);

  if (isAuthChecked === false) {
    navigate('/login', { replace: true });
  }
  return children;
};
