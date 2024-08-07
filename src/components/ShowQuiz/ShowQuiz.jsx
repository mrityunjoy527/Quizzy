import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import classes from "./ShowQuiz.module.css";
import useQuizControl from "../../useQuizControl";
import { useState } from "react";

export const ShowQuiz = () => {

    const [selected, setSelected] = useState(0);
    const { nextQuiz, prevQuiz } = useQuizControl();

    return <section className={classes.showQuiz}>
        <div className={classes.progress}></div>
        <p className={classes.questionNumber}>Question 1/5</p>
        <header>Which former British colony was given back to China in 1997?</header>
        <div className={classes.option}>
            <p onClick={() => { setSelected(1) }} style={{ outline: selected == 1 && "4px solid rgb(1, 196, 1)" }}>Russia</p>
            <p onClick={() => { setSelected(2) }} style={{ outline: selected == 2 && "4px solid rgb(1, 196, 1)" }}>America</p>
            <p onClick={() => { setSelected(3) }} style={{ outline: selected == 3 && "4px solid rgb(1, 196, 1)" }}>Australia</p>
            <p onClick={() => { setSelected(4) }} style={{ outline: selected == 4 && "4px solid rgb(1, 196, 1)" }}>Hong Kong</p>
        </div>
        <div className={classes.quizNav}>
            <button className={classes.button} onClick={() => { prevQuiz() }}>
                <GrLinkPrevious />
                <span>last question</span>
            </button>
            <button className={classes.button} onClick={() => { nextQuiz() }}>
                <span>next question</span>
                <GrLinkNext />
            </button>
        </div>
    </section >
}