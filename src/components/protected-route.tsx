import { useNavigate } from 'react-router-dom';
import { useSelector } from '../services/store';
import { getIsAuth, getUserInfo } from './slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthChecked = useSelector(getIsAuth);

  if (!isAuthChecked) {
    navigate('/login');
  }
  return children;
};
