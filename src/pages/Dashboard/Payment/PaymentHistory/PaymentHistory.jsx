import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {   

    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const {isPending, data:payments=[]}=useQuery({
        queryKey:['payments', user.email],
        queryFn:async ()=>{
           const res=await axiosSecure.get(`/payments?email=${user.email}`)
           return res.data
        }
    })
    if(isPending){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    

      const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

    return (
         <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
        <thead>
  <tr>
    <th>#</th>
    <th>Transaction ID</th>
    <th>Parcel ID</th>
    <th>User Email</th>
    <th>Amount</th>
   
    <th>Paid At</th>
  </tr>
</thead>
<tbody>
  {payments.map((payment, index) => (
    <tr key={payment.transactionId}>
      <td>{index + 1}</td>
      <td>{payment.transactionId}</td>
      <td>{payment.parcelId}</td>
      <td>{payment.email}</td>
      <td>৳{(payment.amount / 100).toFixed(2)}</td>
     
      <td>{formatDate(payment.paidAtString)}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;