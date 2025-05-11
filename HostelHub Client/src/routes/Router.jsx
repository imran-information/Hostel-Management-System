import { Route, Routes } from "react-router";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Meals from "../pages/Meals/Meals";
import FoodSafety from "../pages/FoodSafety/FoodSafety";
import SocialImpact from "../pages/SocialImpact/SocialImpact";
import CookingChallenge from "../pages/CookingChallenge/CookingChallenge";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import AddMealForm from "../pages/Dashboard/Admin/AddMealFrom";
import AllMeals from "../pages/Dashboard/Admin/AllMeals";


const Router = () => {
    return (
        <Routes>
            {/* Main layout */}
            <Route path="/" element={<Main />} >
                <Route index element={<Home />} />
                <Route path="/meals" element={<Meals />} />
                <Route path="/food-safety" element={<FoodSafety />} />
                <Route path="/social-impact" element={<SocialImpact />} />
                <Route path="/cooking-challenge" element={<CookingChallenge />} />
            </Route>
            {/* SignIn page */}
            <Route path="/login" element={<Login />} />
            {/* SignUp page  */}
            <Route path="/signup" element={<Signup />} />


            {/* Dashboard Layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="admin-profile" element={<AdminProfile />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="add-meal" element={<AddMealForm />} />
                <Route path="all-meals" element={<AllMeals />} />
            </Route>

        </Routes>
    )

};

export default Router;