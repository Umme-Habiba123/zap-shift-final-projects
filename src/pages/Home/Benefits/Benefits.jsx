// src/components/InfoSection.jsx

import img1 from "../../../assets/illustration.png";     
import img2 from "../../../assets/safe-delivery.png";
import img3 from "../../../assets/live-tracking.png";
import BenefitsCard from "./BenefitsCard";

const cards = [             
  {
    image: img1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    image: img2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: img3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#f5f7f8] py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {cards.map((card, index) => (
          <BenefitsCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
