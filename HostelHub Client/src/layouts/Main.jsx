import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import CustomToaster from '../pages/shared/CustomToaster/CustomToaster';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen font-poppins">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />

            {/* Toast  */}
            <CustomToaster />
        </div>
    );
};

export default Main;