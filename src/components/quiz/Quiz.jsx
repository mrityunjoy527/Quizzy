import "./quiz.css";
import {defaultQuiz} from "../../questions";
import useQuizControl from "../../useQuizControl";

export default function Quiz() {

    const { quizIdx } = useQuizControl();
    const quiz = defaultQuiz[quizIdx];

    const checkOnlyOne = (checkbox) => {
        let boxes = document.querySelectorAll('input[type=checkbox');
        boxes.forEach((box) => {
            if (box !== checkbox) box.checked = false;
        });
    }

    return <div className="quiz">
        <h2>{quiz.question}</h2>
        <div className="options">
            <div className="half">
                <div className="option" onClick={(e) => checkOnlyOne(e.target.closest("input"))}>
                    <input type="checkbox" name="checkbox" id="one" onChange={(e) => { e.target.checked = true }} />
                    <label htmlFor="one" >{quiz.incorrect_answers[0]}</label>
                </div>
                <div className="option" onClick={(e) => checkOnlyOne(e.target.closest("input"))}>
                    <input type="checkbox" name="checkbox" id="two" onChange={(e) => { e.target.checked = true }} />
                    <label htmlFor="two">{quiz.incorrect_answers[1]}</label>
                </div>
            </div>
            <div className="half">
                {quiz.incorrect_answers.length > 2 && <div className="option" onClick={(e) => checkOnlyOne(e.target.closest("input"))}>
                    <input type="checkbox" name="checkbox" id="three" onChange={(e) => { e.target.checked = true }} />
                    <label htmlFor="three">{quiz.incorrect_answers[2]}</label>
                </div>}
                {quiz.incorrect_answers.length > 3 && <div className="option" onClick={(e) => checkOnlyOne(e.target.closest("input"))}>
                    <input type="checkbox" name="checkbox" id="four" onChange={(e) => { e.target.checked = true }} />
                    <label htmlFor="four">{quiz.incorrect_answers[3]}</label>
                </div>}
            </div >
        </div >
    </div >;
}