import React, { } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import { logTracking } from "../../hooks/useTrackingLogger";

const SendParcelForm = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const serviceCenter = useLoaderData()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const parcelType = watch("type");
  const senderCenterWatch = watch("senderCenter");
  const receiverCenterWatch = watch("receiverCenter");

  const getGajioon = (centerName) => {
    const center = serviceCenter.find(w => w.name === centerName);
    return center ? center.gajioon : '';
  };

  const calculateCost = (data) => {
    const type = data.type;
    const weight = parseFloat(data.weight) || 0;

    let base = type === 'document' ? 100 : 150;
    let weightCharge = type === 'non-document' ? weight * 10 : 0;
    let serviceCharge = 20;
    let total = base + weightCharge + serviceCharge;

    return { base, weightCharge, serviceCharge, total };
  };

  const generateTrackingId = () => `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

  const onSubmit = (data) => {
    const costBreakdown = calculateCost(data);
    const { base, weightCharge, serviceCharge, total } = costBreakdown;

    Swal.fire({
      title: 'Delivery Cost Breakdown',
      html: `
        <div style="text-align: left; font-size: 16px">
          <p><strong>Base Price:</strong> ৳${base}</p>
          <p><strong>Weight Charge:</strong> ৳${weightCharge}</p>
          <p><strong>Service Charge:</strong> ৳${serviceCharge}</p>
          <hr/>
          <p style="font-size: 18px;"><strong>Total: ৳${total}</strong></p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Go Back to Edit',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const finalData = {
          ...data,
          senderEmail: user?.email || 'unknown',
          cost: total,
          trackingId: generateTrackingId(),
          status: 'pending',
          paymentStatus: 'unpaid',
          creation_date: new Date().toISOString(),
          creation_time: new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Dhaka',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
        console.log("Saved to DB:", finalData);

        axiosSecure.post('/parcels', finalData)
          .then(res => {
            if (res.data.insertedId) {
              // ✅ Log tracking after parcel is submitted
              logTracking(res.data.insertedId, 'parcel_submitted', 'Parcel submitted by user');

              Swal.fire('Success!', 'Parcel Saved & Proceeding to Payment.', 'success');
              reset();
              navigate('/dashboard/myParcels');
            } else {
              Swal.fire('Edit Mode', 'You can edit your parcel details again.', 'info');
            }
          });
        // await logTracking(
        //   {
        //     // trackingId: "abc123",
        //     status: "parcel_submitted",
        //     details: `paid by ${user.displayName}`,
        //     location: parcel.senderCenter,
        //     updatedBy: user.email
        //   }

        // )

        navigate('/dashboard/myParcels')

      }
    })

  };




  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-2">Send Your Parcel</h2>
      <p className="text-center mb-8 text-gray-500">Fill the form below to schedule a pickup & delivery</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <fieldset className="border border-gray-300 p-4 rounded shadow">
          <legend className="text-xl font-bold">Parcel Info</legend>
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label className="label">Parcel Name</label>
              <input type="text" placeholder="Describe your parcel" className="input input-bordered w-full" {...register("title", { required: true })} />
              {errors.title && <p className="text-error text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Parcel Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" value="document" {...register("type", { required: true })} className="radio" />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="non-document" {...register("type", { required: true })} className="radio" />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.type && <p className="text-error text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="input input-bordered w-full"
                {...register("weight")}
                disabled={parcelType !== "non-document"}  // কেবল non-document এ weight সক্রিয়
              />

            </div>
          </div>
        </fieldset>

        {/* Sender & Receiver Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender */}
          <fieldset className="border border-gray-300 p-4 rounded shadow">
            <legend className="text-xl font-bold">Sender Info</legend>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input type="text" className="input input-bordered w-full" {...register("senderName", { required: true })} placeholder="Sender Name" />
              <input type="tel" className="input input-bordered w-full" {...register("senderContact", { required: true })} placeholder="Contact" />
              <input type="text" className="input input-bordered w-full" {...register("senderRegion", { required: true })} placeholder="Region" />


              {/* select sender senter---- */}
              <select className="select select-bordered w-full" {...register("senderCenter", { required: true })}>
                <option value="">Select Sender Center</option>
                {serviceCenter.map(({ district, covered_area }) => (
                  <optgroup key={district} label={district}>
                    {covered_area.map(center => (
                      <option key={center} value={center}>{center}</option>
                    ))}
                  </optgroup>
                ))}
              </select>




              {senderCenterWatch && (
                <p className="text-sm mt-1 text-gray-600">Gajioon: <strong>{getGajioon(senderCenterWatch)}</strong></p>
              )}
              <input type="text" className="input input-bordered w-full" {...register("senderAddress", { required: true })} placeholder="Sender Address" />
              <textarea className="textarea textarea-bordered w-full" {...register("pickupNote", { required: true })} placeholder="Pickup Instruction" />
            </div>
          </fieldset>

          {/* Receiver */}
          <fieldset className="border border-gray-300 p-4 rounded shadow">
            <legend className="text-xl font-bold">Receiver Info</legend>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input type="text" className="input input-bordered w-full" {...register("receiverName", { required: true })} placeholder="Receiver Name" />
              <input type="tel" className="input input-bordered w-full" {...register("receiverContact", { required: true })} placeholder="Contact" />
              <input type="text" className="input input-bordered w-full" {...register("receiverRegion", { required: true })} placeholder="Region" />


              {/*  select receiver senter----  */}
              <select className="select select-bordered w-full" {...register("receiverCenter", { required: true })}>
                <option value="">Select Receiver Center</option>
                {serviceCenter.map(({ district, covered_area }) => (
                  <optgroup key={district} label={district}>
                    {covered_area.map(center => (
                      <option key={center} value={center}>{center}</option>
                    ))}
                  </optgroup>
                ))}
              </select>


              {receiverCenterWatch && (
                <p className="text-sm mt-1 text-gray-600">Gajioon: <strong>{getGajioon(receiverCenterWatch)}</strong></p>
              )}
              <input type="text" className="input input-bordered w-full" {...register("receiverAddress", { required: true })} placeholder="Receiver Address" />
              <textarea className="textarea textarea-bordered w-full" {...register("deliveryNote", { required: true })} placeholder="Delivery Instruction" />
            </div>
          </fieldset>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-10">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcelForm;
