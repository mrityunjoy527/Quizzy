import "./home.css";
import { Outlet } from "react-router-dom";

export default function Home() {

    return <div className="home">
        <img src="./wonder.png" alt="" />
        <div className="quiz-desc">
            <Outlet />
        </div>
    </div>
}