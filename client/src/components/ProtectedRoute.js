import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  return localStorage.getItem('authToken') ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
