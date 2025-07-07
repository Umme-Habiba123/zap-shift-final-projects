import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoCheckmark } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";



const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    const { isPending, data: riders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders?status=pending');
            return res.data;
        }
    });

    if (isPending) {
        return <h1 className='text-center text-4xl mt-20'>...Loading</h1>
    }

    // Approve rider-------
    const handleApprove = async (riderId, riderEmail) => {
        const result = await Swal.fire({
            title: 'Approve this rider?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Approve',
            confirmButtonColor: '#16a34a',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/riders/approve/${riderId}`, { 
                    email: riderEmail 
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Approved!', 'Rider is approved.', 'success');
                    refetch();
                } else {
                    Swal.fire('Oops!', 'Something went wrong.', 'warning');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Failed to approve rider.', 'error');
            }
        }
    };


    // Cancel rider
    const handleCancel = async (riderId) => {
        const result = await Swal.fire({
            title: 'Reject this rider application?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject',
            confirmButtonColor: '#dc2626',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/riders/cancel/${riderId}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Rejected!', 'Rider application has been cancelled.', 'success');
                    refetch();
                } else {
                    Swal.fire('Oops!', 'Something went wrong.', 'warning');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Failed to reject rider.', 'error');
            }
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td className="space-x-1">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => setSelectedRider(rider)}
                                    >
                                        <FaEye size={20} />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleApprove(rider._id, rider.email)}
                                    >
                                        <IoCheckmark size={20} />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleCancel(rider._id, 'cancel', rider.email)}
                                    >
                                        <RxCrossCircled size={20} />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-lg dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-xl">
                        <h3 className="text-xl font-bold mb-4">Rider Information</h3>
                        <div className="space-y-2 text-2xl">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Number:</strong> {selectedRider.bikeNumber}</p>
                            <p><strong>Additional Info:</strong> {selectedRider.additionalInfo || 'N/A'}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="btn text-lg" onClick={() => setSelectedRider(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}


            
        </div>
    );
};

export default PendingRiders;
