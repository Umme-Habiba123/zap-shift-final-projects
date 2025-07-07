import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const PendingDeliveries = ({ riderEmail }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const logTracking = useTrackingLogger();
  const { user } = useAuth();

  // Fetch pending parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['rider-parcels', riderEmail],
    enabled: !!user?.email,
    queryFn: () =>
      axiosSecure.get(`/parcels/rider?email=${riderEmail}`).then(res => res.data),
  });

  // Mutation to update status and log tracking
  const updateStatus = useMutation({
    mutationFn: async ({ parcel, newStatus }) => {
      // 1. Update parcel status on server
      await axiosSecure.patch(`/parcels/status/${parcel._id}`, { status: newStatus });

      // 2. Build a human‐readable detail message
      const actionText =
        newStatus === 'in-transit'
          ? `Picked up by ${user.displayName}`
          : `Delivered by ${user.displayName}`;

      // 3. Log the tracking entry
      await logTracking(parcel._id, newStatus, actionText);

      return;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Status updated successfully', 'success');
      queryClient.invalidateQueries(['rider-parcels', riderEmail]);
    },
    onError: () => {
      Swal.fire('❌ Error', 'Failed to update status', 'error');
    },
  });

  const handleStatusChange = (parcel, action) => {
    const newStatus = action === 'pickedUp' ? 'in-transit' : 'delivered';
    updateStatus.mutate({ parcel, newStatus });
  };

  if (isLoading) return <p className="text-white text-center">Loading deliveries...</p>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Receiver</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <td>{i + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverContact}</td>
                <td>{parcel.receiverAddress}</td>
                <td>৳{parcel.cost}</td>
                <td className="capitalize">{parcel.status}</td>
                <td>
                  {parcel.status === 'rider-assign' && (
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => handleStatusChange(parcel, 'pickedUp')}
                    >
                      Mark Picked Up
                    </button>
                  )}
                  {parcel.status === 'in-transit' && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleStatusChange(parcel, 'delivered')}
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
