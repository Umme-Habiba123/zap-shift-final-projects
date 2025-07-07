import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { Navigate } from 'react-router';

const axiosSecure=axios.create({
   baseURL : `http://localhost:5000`
})

const useAxiosSecure = () => {

    const {user,logOut}=useAuth()

   axiosSecure.interceptors.request.use(config=>{
    config.headers.Authorization=`Bearer ${user.accessToken}`
     return config
   }, error=>{
     return Promise.reject(error);
   })


   axiosSecure.interceptors.response.use(res=>{
    return res
   },error =>{
    console.log('inside res interceptors',error)
    const status=error.status
    if(status=== 403 ){
      Navigate('/forbidden')
    }
    else if (status===401){
      logOut()
      .then(()=>{
         Navigate('/login')
      })
      .catch(()=>{

      })   
    }
    return Promise.reject(error)
   }
  )
   return axiosSecure
};

export default useAxiosSecure;
