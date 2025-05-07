import React from 'react';
import Banner from '../../components/Home/Banner';
import MealCategories from '../../components/Home/MealCategories';

const Home = () => {
    return (
        <div className="space-y-12">
            <Banner />
            <MealCategories />
            {/* <MembershipPlans /> */}
        </div>
    );
};

export default Home;