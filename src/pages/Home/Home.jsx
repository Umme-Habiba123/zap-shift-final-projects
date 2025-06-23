import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Sercvices';
import ClientLogoMarquee from './ClientLogoMarquee/ClientLogoMarquee';
import Benefits from './Benefits/Benefits';
import Marchant from './Marchant/Marchant';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientLogoMarquee></ClientLogoMarquee>
           <Benefits></Benefits>
           <Marchant></Marchant>
        </div>
    );
};

export default Home;