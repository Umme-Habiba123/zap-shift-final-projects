// src/components/InfoCard.jsx

const BenefitsCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm">
      <img src={image} alt={title} className="w-28 h-28 object-contain " />
      <p className="border-r-2 border-dashed border-gray-500 ">p</p>
      <div className="text-center md:text-left ">
        <h3 className="text-lg font-bold text-[#03373D] mb-2">{title}</h3>
        <p className="text-sm text-gray-600 ">{description}</p>
      </div>
    </div>
  );
};

export default BenefitsCard;
