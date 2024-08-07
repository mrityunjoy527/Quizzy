import classes from "./AddQuiz.module.css";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function ShowQuiz() {

    const [addQuestion, setAddQuestion] = useState(false);
    const [option, setOption] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
    });
    const [selected, setSelected] = useState(0);

    const handleOptions = (optionNum) => {
        let addOption = "";
        switch (optionNum) {
            case 1:
                addOption = "option1";
                break;
            case 2:
                addOption = "option2";
                break;
            case 3:
                addOption = "option3";
                break;
            default:
                addOption = "option4";
        }
        setOption(prev => {
            return {
                ...prev,
                [addOption]: true,
            }
        });
    }

    const handleDelete = (optionNumber) => {
        setOption(prev => ({ ...prev, [`option${optionNumber}`]: false }));
        if (optionNumber === selected) {
            setSelected(0);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return <section className={classes.showQuiz}>
        <div className={classes.progress}></div>
        <p className={classes.questionNumber}>Question 1/5</p>
        <form className={classes.form} method="post" onSubmit={submitHandler}>
            {!addQuestion ?
                <header onClick={() => setAddQuestion(true)}>
                    <IoIosAddCircleOutline className={classes.addQuestion} />
                    <p>Add Question</p>
                </header> :
                <textarea className={classes.question} required name="Question" placeholder="What is the best quiz app you know ?" />
            }
            <div className={classes.option}>
                {option.option1 === false ?
                    <header onClick={() => handleOptions(1)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 1</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 1} onClick={() => setSelected(1)} />
                        <input type="text" name="answer" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(1)}> Delete</p>
                    </figure>
                }
                {option.option2 === false ?
                    <header onClick={() => handleOptions(2)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 2</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 2} onClick={() => setSelected(2)} />
                        <input type="text" name="answer" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(2)}>Delete</p>
                    </figure>
                }
                {option.option3 === false ?
                    <header onClick={() => handleOptions(3)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 3</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 3} onClick={() => setSelected(3)} />
                        <input type="text" name="answer" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(3)}>Delete</p>
                    </figure>
                }
                {option.option4 === false ?
                    <header onClick={() => handleOptions(4)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 4</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 4} onClick={() => setSelected(4)} />
                        <input type="text" name="answer" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(4)}>Delete</p>
                    </figure>
                }

            </div>
            <button className={classes.saveButton}>
                <span>Save</span>
            </button>
        </form>
    </section >
}