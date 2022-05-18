// src/components/IsPrivate.js
// when i copy paste it works but when i type it out, it doenst?
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsAdmin({ children }) {
  const { user } = useContext(AuthContext);

  // If the authentication is still loading

  if (user.role !== 'ADMIN') {
    // If the user is not admin
    return <Navigate to='/' />;
  } else {
    // If the user is admin, allow to see the page
    return children;
  }
}

export default IsAdmin;
