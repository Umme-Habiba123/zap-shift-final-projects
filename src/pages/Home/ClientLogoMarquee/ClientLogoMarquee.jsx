// src/components/ClientsSlider.jsx
import Marquee from "react-fast-marquee";
import amazoon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import start from '../../../assets/brands/start.png'
import people from '../../../assets/brands/start-people 1.png'

const clientLogos = [amazoon,amazon_vector,casio,moonstar,randstad,start,people];

const ClientLogoMarquee = () => {
  return (
    <div className="bg-[#f5f7f8] pt-10">
      <h2 className="text-3xl font-bold text-center text-black mb-6">We've helped thousands of sales teams</h2>
<div className="bg-[#f5f7f8] py-10">
          <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false}
        direction="left"
      >
        {clientLogos.map((logo, index) => (
          <div key={index} className="mx-15 ">
            <img
              src={logo}
              alt={`Client Logo ${index + 1}`}
              className=" w-auto object-contain h-4"
            />
          </div>
        ))}
      </Marquee>
</div>
    </div>
  );
};

export default ClientLogoMarquee;
