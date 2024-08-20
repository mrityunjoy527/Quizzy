import { GrLinkNext } from "react-icons/gr";
import classes from "./LandingPage.module.css";
import { useEffect } from "react";
import useFirebaseUser from "../../useFirebaseUser";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const {email} = useFirebaseUser();
    const navigate = useNavigate();

    useEffect(() => {

        if(!email) navigate("/login", {replace: true});

    }, [email, navigate]);


    return <div className={classes.home}>
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
            <div className={classes.questions}>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem, ipsum?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem ?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet?</p>
            </div>
            <button>
                <span>Start Quiz</span>
                <GrLinkNext />
            </button>
        </article>
    </div>;
}

export default LandingPage;