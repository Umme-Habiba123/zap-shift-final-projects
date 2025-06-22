// src/pages/Home/ServiceCard.jsx

const ServiceCard = ({ service }) => {
  const { title, description, icon: Icon } = service;

  return (
   <div className="card group bg-[#1e1e1e] text-white shadow-md border border-gray-700 hover:shadow-xl transition duration-300 hover:bg-orange-200 hover:text-black rounded-2xl">
  <div className="card-body text-center">
    <div>{Icon}</div>
    <h3 className="text-xl font-semibold mb-2 group-hover:text-black">{title}</h3>
    <p className="text-sm text-gray-300 group-hover:text-black transition-colors duration-300">{description}</p>
  </div>
</div>
  );
};

export default ServiceCard;
