import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer'; 

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen font-poppins">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer /> 
        </div>
    );
};

export default Main;