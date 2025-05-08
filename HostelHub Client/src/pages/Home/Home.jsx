import React from 'react';
import Banner from '../../components/Home/Banner';
import MealCategories from '../../components/Home/MealCategories';
import MembershipPlans from '../../components/Home/MembershipPlans';
import HowItWorks from '../../components/Home/HowItWorks';
import Facilities from '../../components/Home/Facilities';
import AnnouncementBar from '../../components/Home/AnnouncementBar';
import StatsCounter from '../../components/Home/StatsCounter';
import Gallery from '../../components/Home/Gallery';
import Testimonials from '../../components/Home/Testimonials';
import About from '../../components/Home/About';

const Home = () => {
    return (
        <div className=" overflow-hidden">
            {/* <AnnouncementBar /> */}
            <Banner />
            <StatsCounter />
            <About />
            <MealCategories />
            <Testimonials />
            <HowItWorks />
            <MembershipPlans />
            <Gallery />
            <Facilities />
        </div>
    );
};

export default Home;