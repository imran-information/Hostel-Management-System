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
import UpdateMealPage from "../pages/Dashboard/Admin/UpdateMealPage";
import ReviewManagement from "../pages/Dashboard/Admin/ReviewManagement";
import UpcomingMeals from "../pages/Dashboard/Admin/UpcomingMeals";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals";
import Profile from "../pages/Dashboard/Student/Profile";
import PrivateRoute from "./PrivateRoute";
import ProtectDashboard from "./ProtectDashboard";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import MyMealRequests from "../pages/Dashboard/Student/MyMealRequests";
import MyPayments from "../pages/Dashboard/Student/MyPayments";
import EnhancedMealsPage from "../pages/Dashboard/Student/EnhanceMealsPage";


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
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                {/* Admin routes */}
                <Route path="admin-profile" element={<ProtectDashboard><AdminProfile /></ProtectDashboard>} />
                <Route path="user-management" element={<ProtectDashboard><UserManagement /></ProtectDashboard>} />
                <Route path="add-meal" element={<ProtectDashboard><AddMealForm /></ProtectDashboard>} />
                <Route path="all-meals" element={<ProtectDashboard><AllMeals /></ProtectDashboard>} />
                <Route path="updateMeal/:id" element={<ProtectDashboard><UpdateMealPage /></ProtectDashboard>} />
                <Route path="review-management" element={<ProtectDashboard><ReviewManagement /></ProtectDashboard>} />
                <Route path="upcoming-meals" element={<ProtectDashboard><UpcomingMeals /></ProtectDashboard>} />
                <Route path="serve-meals" element={<ProtectDashboard><ServeMeals /></ProtectDashboard>} />

                {/* Student routes  */}
                <Route path="student-profile" element={<Profile />} />
                <Route path="my-reviews" element={<MyReviews />} />
                <Route path="my-requests" element={<MyMealRequests />} />
                <Route path="my-payments" element={<MyPayments />} />
                <Route path="enhanced-Meals" element={<EnhancedMealsPage />} />
            </Route>

        </Routes>
    )

};

export default Router;