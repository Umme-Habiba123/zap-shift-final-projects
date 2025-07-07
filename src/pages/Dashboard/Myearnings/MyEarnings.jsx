import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
  parseISO,
} from 'date-fns';

const calculateEarning = (parcel) => {
  const cost = parcel.cost || 0;
  const isSameDistrict = parcel.receiverDistrict === parcel.serviceCenter;
  return isSameDistrict ? cost * 0.8 : cost * 0.3;
};

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['my-deliveries', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/completed?email=${user.email}`);
      return res.data;
    },
  });

  let total = 0,
    totalCashedOut = 0,
    totalPending = 0,
    today = 0,
    week = 0,
    month = 0,
    year = 0;

  parcels.forEach((p) => {
    const earning = calculateEarning(p);
    const deliveredAt = parseISO(p.delivered_at);
    console.log(deliveredAt)

    total += earning;
    if (p.cashout_status === 'cashed_out') totalCashedOut += earning;
    else totalPending += earning;

    if (isToday(deliveredAt)) today += earning;
    if (isThisWeek(deliveredAt)) week += earning;
    if (isThisMonth(deliveredAt)) month += earning;
    if (isThisYear(deliveredAt)) year += earning;
  });

  if (isLoading) return <p className="text-center text-white">Loading earnings...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">📊 My Earnings Summary</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded shadow">💰 Total: ৳{total.toFixed(2)}</div>
        <div className="bg-green-800 p-4 rounded shadow">✅ Cashed Out: ৳{totalCashedOut.toFixed(2)}</div>
        <div className="bg-yellow-600 p-4 rounded shadow">⏳ Pending: ৳{totalPending.toFixed(2)}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-800 p-4 rounded shadow">Today: ৳{today.toFixed(2)}</div>
        <div className="bg-indigo-700 p-4 rounded shadow">Week: ৳{week.toFixed(2)}</div>
        <div className="bg-purple-700 p-4 rounded shadow">Month: ৳{month.toFixed(2)}</div>
        <div className="bg-pink-700 p-4 rounded shadow">Year: ৳{year.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default MyEarnings;
