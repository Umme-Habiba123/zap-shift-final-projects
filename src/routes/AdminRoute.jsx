import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/UseUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({Children}) => {
    const {user, loading}=useAuth()
    const {role, isLoading}=useUserRole()

      if(loading || isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(!user || role !=='admin'){
         return <Navigate to='/forbidden' state={{from: location.pathname}} ></Navigate>
    }

    return Children
};

export default AdminRoute;