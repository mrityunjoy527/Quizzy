import classes from "./Home.module.css";
import { Outlet } from "react-router-dom";

export default function Home() {

    return <div className={classes.home}>
        <img src="./wonder.png" alt="" />
        <div className={classes.quizDesc}>
            <Outlet />
        </div>
    </div>
}