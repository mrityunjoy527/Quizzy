import { useState } from "react";
import { defaultQuiz } from "../../questions";
import useQuizControl from "../../useQuizControl";
import AddQuiz from "../addQuiz/AddQuiz";
import Quiz from "../quiz/Quiz";
import "./home.css";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { ShowQuiz } from "../ShowQuiz/ShowQuiz";

export default function Home() {

    const { quizIdx, nextQuiz, prevQuiz } = useQuizControl();
    const quiz = defaultQuiz[quizIdx];

    let color;
    switch (quiz.difficulty) {
        case "easy": color = "#06D001";
            break;
        case "Easy": color = "#06D001";
            break;
        case "medium": color = "#FFC700";
            break;
        case "Medium": color = "#FFC700";
            break;
        case "hard": color = "#e2223d";
            break;
        case "Hard": color = "#e2223d";
            break;
    }

    const { creatingQuiz } = useQuizControl();


    return <div className="home">
        <img src="./wonder.png" alt="" />
        <div className="quiz-desc">
            <div className="quiz-nature">
            </div>
            <AddQuiz />
            {/* <ShowQuiz/> */}
        </div>
    </div>
}