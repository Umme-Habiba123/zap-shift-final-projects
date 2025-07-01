import React from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcelsTable = ({ parcels, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate= useNavigate()

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This parcel will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`)

          .then(res => {
            console.log(res.data)
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success');
              refetch && refetch(); // refresh the list if refetch function passed
            }

          });
          refetch()
      }
    });
  };

  const handlePay = (id) => {
    console.log("Pay clicked for:", id);
    navigate(`/dashboard/payment/${id}`)
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr className="text-base text-gray-600">
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created</th>
            <th>Cost (৳)</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => (
            <tr key={parcel._id}>
             
              <td>{index + 1}</td>
               <td>{parcel.title}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{parcel.creation_time}</td>
              <td>{parcel.cost}</td>
              <td>
                {parcel.paymentStatus === 'paid' ? (
                  <span className="badge badge-success badge-outline">Paid</span>
                ) : (
                  <span className="badge badge-error badge-outline">Unpaid</span>
                )}
              </td>
              <td className="flex flex-wrap gap-2">
                <Link to={`/dashboard/myParcels/view/${parcel._id}`}>
                  <button className="btn btn-xs btn-outline btn-info">View</button>
                </Link>
                {parcel.paymentStatus !== 'paid' && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-xs btn-outline btn-success"
                  >
                    Pay
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-xs btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcelsTable;
