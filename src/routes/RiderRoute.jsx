import React from 'react';
import useUserRole from '../hooks/UseUserRole';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const RiderRoute = ({Children}) => {
       const {user, loading}=useAuth()
       const {role, isLoading}=useUserRole()
   
         if(loading || isLoading){
           return <span className="loading loading-spinner loading-xl"></span>
       }
   
       if(!user || role !=='rider'){
            return <Navigate to='/forbidden' state={{from: location.pathname}} ></Navigate>
       }
   
       return Children
};

export default RiderRoute;