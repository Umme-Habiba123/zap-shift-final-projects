import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import reviewTopImg from '../../../assets/customer-top.png'; // update path as per your project

const testimonials = [
  {
    id: 1,
    text: "Posture Pro has completely changed my daily comfort. I feel stronger and pain-free!",
    name: "Mahiya Rehman",
    occupation: "Yoga Instructor",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    text: "I love how easy it is to use and how quickly I noticed improvements in my posture.",
    name: "Tanjil Shawon",
    occupation: "Senior Chef",
    image: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: 3,
    text: "Perfect for anyone with long hours at a desk. My back has never felt better.",
    name: "Joya Akter",
    occupation: "Office Executive",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: 4,
    text: "Highly recommend it to my clients. Great design and amazing support.",
    name: "Fahim Khan",
    occupation: "Physiotherapist",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

const CustomerReview = () => {
  const [centerSlide, setCenterSlide] = useState(0);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    dots: true, 
    beforeChange: (oldIndex, newIndex) => setCenterSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      {/* Top Image */}
      <img
        src={reviewTopImg}
        alt="Posture Image"
        className="mx-auto mb-8 max-h-60 object-contain"
      />

      {/* Title and Description */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        What our customers are saying
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Slider */}
      <Slider {...settings}>
        {testimonials.map((t, index) => (
          <div key={t.id} className="px-4">
            <div
              className={`bg-white shadow-lg rounded-2xl p-8 text-left transition-all duration-500 my-5 ${
                centerSlide === index
                  ? "scale-105 blur-0"
                  : "scale-90 blur-xs opacity-50"
              }`}
            >
              <FaQuoteLeft className="text-5xl text-blue-200 mb-4" />
              <p className="text-gray-700 mb-6">{t.text}</p>
              <div className="border-t border-dashed border-gray-300 mb-4"></div>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#03373D]">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.occupation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CustomerReview;
