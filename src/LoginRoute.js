import { useAuthContext } from './Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginRoute = ({ children }) => {
  const AuthContext = useAuthContext();
  return (!AuthContext.logged ? children : <Navigate to={'/admin'} />);
};

export default LoginRoute;