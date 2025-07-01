import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyParcelsTable from './MyParcelsTable';

const MyParcels = () => {

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: parcels = [],refetch } = useQuery({
    queryKey: ['my-parcel', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      return res.data
    }
  })

  console.log(parcels)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
      <MyParcelsTable parcels={parcels} refetch={refetch}/>



    </div>
  );
};

export default MyParcels;