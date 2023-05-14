import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Header from "./Header";

const Layout = () => {
    return (
        <>

            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;