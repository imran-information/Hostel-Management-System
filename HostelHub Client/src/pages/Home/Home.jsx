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
import CTA from '../../components/Home/CTA';
import About from '../../components/Home/About';
import Button from '../shared/Button/Button';

const Home = () => {
    return (
        <div className=" overflow-hidden">
            {/* <AnnouncementBar /> */}
            <Banner />
            <StatsCounter />
            <About />
            <>
                {/* // Regular button */}
                <Button >Click Me</Button>

                {/* // Outlet button */}
                <Button isOutlet to="/dashboard" outletProps={{ state: { from: 'home' } }}>
                    Open Dashboard
                </Button>

                {/* // Button with icon */}
                <Button variant="secondary" >
                    Settings
                </Button>

                {/* Loading button */}
                <Button loading={true}>Processing...</Button>
            </>
            <MealCategories />
            <HowItWorks />
            <MembershipPlans />
            <Gallery />
            <Facilities />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default Home;