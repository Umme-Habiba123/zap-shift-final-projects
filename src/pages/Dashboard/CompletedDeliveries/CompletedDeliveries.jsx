import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get completed deliveries & earnings
  const { data = {}, isLoading } = useQuery({
    queryKey: ['completed-deliveries', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/completed/${user.email}`);
      return res.data;
    }
  });

  const { deliveries = [], totalParcels = 0, totalEarnings = 0 } = data;

  // Cashout mutation
  const cashoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/parcels/cashout/${user.email}`);
      return res.data;
    },
    onSuccess: (res) => {
      Swal.fire('✅ Cashout Complete', `${res.modifiedCount} deliveries marked as cashed out`, 'success');
      queryClient.invalidateQueries(['completed-deliveries', user.email]);
    },
    onError: () => {
      Swal.fire('❌ Failed', 'Cashout failed, try again.', 'error');
    }
  });

  const handleCashout = () => {
    Swal.fire({
      title: 'Confirm Cashout?',
      text: 'Are you sure you want to cashout all unpaid deliveries?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cashout',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        cashoutMutation.mutate();
      }
    });
  };

  if (isLoading) return <p className="text-white text-center">Loading completed deliveries...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white max-w-6xl mx-auto rounded">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FaCheckCircle /> Completed Deliveries
      </h2>

      <div className="mb-4 flex justify-between">
        <p>Total Deliveries: <strong>{totalParcels}</strong></p>
        <p>Total Earnings: <strong>৳{totalEarnings}</strong></p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="table w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>From</th>
              <th>To</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Picked Up</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>৳{parcel.cost}</td>
                <td className="text-green-400">৳{parcel.earning}</td>
                <td>{parcel.pickedUpAt ? new Date(parcel.pickedUpAt).toLocaleString() : 'N/A'}</td>
                <td>{parcel.deliveredAt ? new Date(parcel.deliveredAt).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-success flex items-center gap-2"
        onClick={handleCashout}
        disabled={deliveries.length === 0 || cashoutMutation.isPending}
      >
        <FaMoneyBillWave /> {cashoutMutation.isPending ? 'Processing...' : 'Cashout'}
      </button>
    </div>
  );
};

export default CompletedDeliveries;
