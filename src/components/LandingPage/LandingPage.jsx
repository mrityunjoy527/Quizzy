import { GrLinkNext } from "react-icons/gr";
import classes from "./LandingPage.module.css";
import { useEffect } from "react";
import useFirebaseUser from "../../useFirebaseUser";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const { fetchFirebaseUser } = useFirebaseUser();
    const navigate = useNavigate();


    useEffect(() => {

        const fetchUser = async (uid) => {
            await fetchFirebaseUser(uid);
        }

        const user = localStorage.getItem("user");
        if (!user) navigate("/login", { replace: true });
        fetchUser(user);

    }, [navigate, fetchFirebaseUser]);


    return <div className={classes.home}>
        <nav>
            <figure>
                <img src="./logo.png" alt="logo" />
                <p>Quizzy?</p>
            </figure>
            <ul>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/quiz/add-quiz">Add Quiz</a></li>
                <li><a href="/">Random Quiz</a></li>
            </ul>
        </nav>
        <article className={classes.quizContainer}>
            <div className={classes.description}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias asperiores odio nostrum, illo deleniti consectetur quam impedit tempore veniam inventore?</p>
                <p>
                    <span>Points</span>: 50
                    <span>⭐</span>
                </p>
                <figure className={classes.createdBy}>
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="" />
                    <p>Mrityunjoy Barman</p>
                </figure>
            </div>
            <button>
                <span>Start Quiz</span>
                <GrLinkNext />
            </button>
        </article>
    </div>;
}

export default LandingPage;