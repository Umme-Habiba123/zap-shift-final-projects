import {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxOpen,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-4xl text-primary mb-4" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia className="text-4xl text-primary mb-4" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaBoxOpen className="text-4xl text-primary mb-4" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-4xl text-primary mb-4" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-4xl text-primary mb-4" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-4xl text-primary mb-4" />,
  },
];

const OurServices = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
