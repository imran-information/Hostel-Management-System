import { Route, Routes } from "react-router";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Meals from "../pages/Meals/Meals";
import FoodSafety from "../pages/FoodSafety/FoodSafety";
import SocialImpact from "../pages/SocialImpact/SocialImpact";
import CookingChallenge from "../pages/CookingChallenge/CookingChallenge";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} >
                <Route index element={<Home />} />
                <Route path="/meals" element={<Meals />} />
                <Route path="/food-safety" element={<FoodSafety />} />
                <Route path="/social-impact" element={<SocialImpact />} />
                <Route path="/cooking-challenge" element={<CookingChallenge />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )

};

export default Router;