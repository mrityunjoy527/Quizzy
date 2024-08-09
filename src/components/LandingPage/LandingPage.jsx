import { GrLinkNext } from "react-icons/gr";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
    return <div className={classes.home}>
        <article className={classes.quizContainer}>
            <div className={classes.description}>
                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias asperiores odio nostrum, illo deleniti consectetur quam impedit tempore veniam inventore?</h3>
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