import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { isLoading, data: riders = [], refetch } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=active');
      return res.data;
    },
  });

  const handleDeactivate = (riderId) => {
    Swal.fire({
      title: 'Deactivate this rider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
      confirmButtonColor: '#dc2626',
      background: '#1f2937',   
      color: '#f9fafb',        
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/deactivate/${riderId}`)
          .then(() => {
            Swal.fire({
              title: 'Deactivated!',
              text: 'The rider has been deactivated.',
              icon: 'success',
              background: '#1f2937',
              color: '#f9fafb',
            });
            refetch();
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to deactivate rider.',
              icon: 'error',
              background: '#1f2937',
              color: '#f9fafb',
            });
          });
      }
    });
  };

  if (isLoading) {
    return <h2 className="text-center mt-10 text-2xl text-white">Loading active riders...</h2>;
  }

  const filteredRiders = riders.filter(rider =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-900 min-h-screen text-white rounded">
      <h2 className="text-3xl font-bold mb-6">Active Riders</h2>

      <input
        type="text"
        placeholder="Search rider by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-700 rounded w-full max-w-md bg-gray-800 text-white placeholder-gray-400"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="border border-gray-700 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Region</th>
              <th className="border border-gray-700 px-4 py-2 text-left">District</th>
              <th className="border border-gray-700 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map(rider => (
                <tr key={rider._id} className="hover:bg-gray-700">
                  <td className="border border-gray-700 px-4 py-2">{rider.name}</td>
                  <td className="border border-gray-700 px-4 py-2">{rider.email}</td>
                  <td className="border border-gray-700 px-4 py-2">{rider.phone}</td>
                  <td className="border border-gray-700 px-4 py-2">{rider.region}</td>
                  <td className="border border-gray-700 px-4 py-2">{rider.district}</td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
