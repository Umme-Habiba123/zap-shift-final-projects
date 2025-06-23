import { FaUserCheck, FaClipboardList, FaShippingFast, FaSmileBeam } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserCheck size={40} className="text-blue-600" />,
    title: "Step 1: Sign Up",
    desc: "Create your account in just a few clicks and get started instantly.",
  },
  {
    id: 2,
    icon: <FaClipboardList size={40} className="text-blue-600" />,
    title: "Step 2: Choose Product",
    desc: "Browse our posture tools and select what suits your needs best.",
  },
  {
    id: 3,
    icon: <FaShippingFast size={40} className="text-blue-600" />,
    title: "Step 3: Fast Delivery",
    desc: "We deliver quickly and safely to your doorstep, wherever you are.",
  },
  {
    id: 4,
    icon: <FaSmileBeam size={40} className="text-blue-600" />,
    title: "Step 4: Feel the Change",
    desc: "Experience better posture, comfort, and confidence every day.",
  },
];

const WorkSteps = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-start ">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {steps.map((step) => (
          <div key={step.id} className="bg-white shadow-2xl shadow-amber-200 rounded-xl p-6 text-center hover:shadow-2xl transition hover:bg-gray-300 hover:scale-110 hover:shadow-green-300">
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl text-[#03373D] font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSteps;
