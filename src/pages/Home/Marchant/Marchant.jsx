import React from 'react';
import marchantPhoto from '../../../assets/location-merchant.png'

const Marchant = () => {
    return (
       <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] rounded-3xl p-20 bg-no-repeat my-5">
  <div className="hero-content flex-col lg:flex-row-reverse rounded-3xl">
    <img
      src={marchantPhoto}
      className="max-w-sm rounded-lg  "
    />
    <div>
      <h1 className="text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6 text-sm">
       We offer the lowest delivery charge with the highest value along with 100% <br /> safety of your product. Pathao courier delivers your parcels in every corner <br /> of Bangladesh right on time.
      </p>
      <button className="btn px-10 bg-[#CAEB66] text-black rounded-3xl hover:bg-lime-400">Become a Merchant</button>
      <button className="btn px-10 ml-2 bg-[#03373D] text-[#CAEB66]  rounded-3xl border border-[#CAEB66] hover:bg-black">Earn with Profast Courier</button>
    </div>
  </div>
</div>
    );
};

export default Marchant;