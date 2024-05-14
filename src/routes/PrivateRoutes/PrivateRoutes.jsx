import React, { Children } from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../shared/Loader/Loader';

const PrivateRoutes = ({children}) => {
 const { user, loading } = useAuth()
 
 const location = useLocation()

 if (loading) return <Loader />
 if (user) return children;


 return <Navigate to={"/login"} state={location.pathname} replace={true} />
};

export default PrivateRoutes;