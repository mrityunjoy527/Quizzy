import { Outlet } from "react-router-dom";
import "./app.css";

const RootLayout = () => {
    return (
        <div className="outerContainer">
            <div className="bg"></div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;