import { useQuery } from '@tanstack/react-query';
import { FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../hooks/useTrackingLogger';
import useAuth from '../../hooks/useAuth';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setselectedRider] = useState()
  const logTracking = useTrackingLogger()
  const { user } = useAuth()


  // Fetch parcels with status=pending and paymentStatus=unpaid
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['assignable-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels?status=pending&paymentStatus=unpaid');
      return res.data;
    }
  });

  // Fetch riders for selected parcel's serviceCenter
  const { data: matchedRiders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ['riders-by-district', selectedParcel?.serviceCenter],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?status=active&senderCenter=${selectedParcel.serviceCenter}`);
      return res.data;
    }
  });

  const handleAssign = async (rider) => {
    setselectedRider(rider)
    try {
      const res = await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,

      });

      if (
        res.data?.parcelModified > 0 &&
        res.data?.riderModified > 0
      ) {
        Swal.fire('✅ Success', `${rider.name} assigned & marked as In Transit`, 'success');
        setIsModalOpen(false);
        setSelectedParcel(null);
        refetch();
        await logTracking(
          {
            trackingId: selectedParcel.trackingId,
            status: "rider assigned",
            details: `assigned to  ${selectedRider.
              name
              }`,
            location: parcels.senderCenter,
            updatedBy: user.email
          }

        )

      } else {
        Swal.fire('⚠️ Failed', 'Assignment failed or already assigned', 'warning');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error', 'Server error occurred', 'error');
    }
  };

  if (isLoading) {
    return <div className="text-center text-white text-2xl mt-10">Loading parcels...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-900 text-white rounded min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Assign Rider to Pending Parcels</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-white">
          <thead>
            <tr className="bg-gray-800">
              <th>#</th>
              <th>Parcel Title</th>
              <th>Sender</th>
              <th>Receiver District</th>
              <th>Service Center</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.senderEmail}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>{parcel.serviceCenter}</td>
                <td>৳{parcel.cost}</td>
                <td className="capitalize">{parcel.status}</td>
                <td className="capitalize">{parcel.paymentStatus}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setIsModalOpen(true);
                    }}
                    className="btn btn-sm btn-success flex items-center gap-2"
                  >
                    <FaUserPlus /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-xl">
            <h3 className="text-xl font-bold mb-4">
              Assign Rider for Parcel: <span className="text-blue-400">{selectedParcel.title}</span>
            </h3>

            {ridersLoading ? (
              <p className="text-white">Loading riders...</p>
            ) : matchedRiders.length === 0 ? (
              <p className="text-red-400">No riders found for <strong>{selectedParcel.serviceCenter}</strong>.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {matchedRiders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded"
                  >
                    <span>{rider.name} ({rider.email})</span>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAssign(rider)}
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedParcel(null);
                }}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
