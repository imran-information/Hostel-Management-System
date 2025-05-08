import { Route, Routes } from "react-router";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Meals from "../pages/Meals/Meals";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} >
                <Route index element={<Home />} />
                <Route path="/meals" element={<Meals />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )

};

export default Router;