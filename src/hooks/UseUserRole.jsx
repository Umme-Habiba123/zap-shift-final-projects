// hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const {axiosSecure} = useAxiosSecure();

  const {
    data: role = 'user',
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data.role ;
    },
  });
  

  return {
    role,
    isLoading,
    isError,
    isAdmin: role === 'admin',
    isRider: role === 'rider',
    isUser: role === 'user' 
   
  };
};

export default useUserRole;
