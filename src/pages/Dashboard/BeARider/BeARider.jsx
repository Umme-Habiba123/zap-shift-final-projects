import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import serviceCenters from '../../../../public/serviceCenter.json';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
// import { useLoaderData } from 'react-router';

const BeARider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [selectedRegion, setSelectedRegion] = useState('');
  const axiosSecure=useAxiosSecure()
  // const serviceCenter=useLoaderData()

  const regions = [...new Set(serviceCenters.map((center) => center.region))];
  const filteredDistricts = serviceCenters
    .filter((center) => center.region === selectedRegion)
    .map((center) => center.district);

  const onSubmit = async (data) => {

    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

 try {
  const res = await axiosSecure.post('/riders', riderData);
  console.log('Response:', res.data);
  if (res.data.insertedId || res.data.success) {
    Swal.fire({
      icon: 'success',
      title: 'Application Submitted!',
      text: 'Your rider request is under review.',
      confirmButtonColor: '#10B981'
    }).then(() => {
      reset();
    });
  } else {
    toast.error('Something went wrong. Please try again.');
  }
} catch (err) {
  console.error(err);
  toast.error('Failed to submit rider application.');
}

  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Be a Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full bg-gray-800 border cursor-not-allowed border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full bg-gray-800 border cursor-not-allowed border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="number"
            {...register('age', { required: true })}
            placeholder="Enter your age"
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block mb-1 font-semibold">Region</label>
          <select
            {...register('region', { required: true })}
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-semibold">District</label>
          <select
            {...register('district', { required: true })}
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          >
            <option value="">Select a district</option>
            {filteredDistricts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="text"
            {...register('phone', { required: true })}
            placeholder="01XXXXXXXXX"
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* NID */}
        <div>
          <label className="block mb-1 font-semibold">National ID Number</label>
          <input
            type="text"
            {...register('nid', { required: true })}
            placeholder="Enter your NID number"
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block mb-1 font-semibold">Bike Brand</label>
          <input
            type="text"
            {...register('bikeBrand', { required: true })}
            placeholder="e.g. Yamaha, Honda"
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="block mb-1 font-semibold">Bike Registration Number</label>
          <input
            type="text"
            {...register('bikeRegNo', { required: true })}
            placeholder="Enter your bike registration number"
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block mb-1 font-semibold">Additional Information</label>
          <textarea
            {...register('additionalInfo')}
            rows={3}
            placeholder="Write anything relevant..."
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-white"
          ></textarea>
        </div>

        {/* Submit */}
        <button 
          type="submit"
          className="w-full bg-[#CAEB66] text-black text-lg px-4 py-2 rounded hover:bg-green-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
