import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Sercvices';
import ClientLogoMarquee from './ClientLogoMarquee/ClientLogoMarquee';
import Benefits from './Benefits/Benefits';
import Marchant from './Marchant/Marchant';
import CustomerReview from './CustomerReview/CustomerReview';
import FaqSection from './FaqSection/FaqSection';
import WorkSteps from './WorkSteps/WorkSteps';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <WorkSteps></WorkSteps>
           <Services></Services>
           <ClientLogoMarquee></ClientLogoMarquee>
           <Benefits></Benefits>
           <Marchant></Marchant>
           <CustomerReview></CustomerReview>
           <FaqSection></FaqSection>
        </div>
    );
};

export default Home;