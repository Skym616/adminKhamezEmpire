import { useAuthContext } from './Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const AuthContext = useAuthContext();
  return (AuthContext.logged ? children : <Navigate to={'/login'} />);
};

export default PrivateRoute;