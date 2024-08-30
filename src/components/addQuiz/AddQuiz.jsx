import classes from "./AddQuiz.module.css";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import useAddQuiz from "../../useAddQuiz";
import Dialog from "../Dialog/Dialog.jsx";
import Modal from "../Modal/Modal.jsx";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/configuration.js";
import useFirebaseUser from "../../useFirebaseUser.js";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {

    const { quizzes, totalQuizzes, addQuiz, resetQuiz } = useAddQuiz();
    const [cancel, setCancel] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const { uid, fetchFirebaseUser } = useFirebaseUser();
    const navigate = useNavigate();
    const user = localStorage.getItem("user");


    useEffect(() => {

        const fetchUser = async (uid) => {
            await fetchFirebaseUser(uid);
        }

        if (!user) navigate("/login", { replace: true });
        return () => {
            fetchUser(user);
        };

    }, [fetchFirebaseUser, user, navigate]);

    const defaultQuiz = {
        question: false,
        option1: false,
        option2: false,
        option3: false,
        option4: false,
    };

    const [quizAction, setQuizAction] = useState(defaultQuiz);
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
        setQuizAction(prev => {
            return {
                ...prev,
                [addOption]: true,
            }
        });
    }

    const handleDelete = (optionNumber) => {
        setQuizAction(prev => ({ ...prev, [`option${optionNumber}`]: false }));
        if (optionNumber === selected) {
            setSelected(0);
        }
    }

    const uploadQuiz = async () => {
        try {
            const ref = collection(db, 'quizzes');
            const docRef = await addDoc(ref, { quizzes: [...quizzes] });
            const { id: docId } = docRef;
            const userRef = doc(db, "users", uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                let { askedQuiz } = docSnap.data();
                askedQuiz ||= [];
                const newQuiz = [docId, ...askedQuiz];
                await updateDoc(userRef, { askedQuiz: newQuiz });
                resetQuiz();
                console.log("added");
                setShowDialog(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (totalQuizzes === 1) uploadQuiz();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const { question, answer1, answer2, answer3, answer4 } = data;
        const newQuestion = {
            question: question,
            answer1: {
                ans: answer1 || null,
                correct: selected === 1,
            },
            answer2: {
                ans: answer2 || null,
                correct: selected === 2,
            },
            answer3: {
                ans: answer3 || null,
                correct: selected === 3,
            },
            answer4: {
                ans: answer4 || null,
                correct: selected === 4,
            },
        };
        let optionCnt = 0;
        for (const q of Object.entries(quizAction)) {
            if (q[1] === true) optionCnt++;
        }
        if (optionCnt < 2) return;
        if (selected === 0) return;
        if (totalQuizzes < 1) addQuiz(newQuestion);
        setSelected(0);
        setQuizAction(defaultQuiz);
    }

    return <section className={classes.showQuiz}>
        {showDialog && <Modal>
            <Dialog text={'You Have Added Total Number of Quizzes'}
                first={<a className={classes.btn} href="/">Home</a>}
                second={<a className={classes.btn} href="/profile" >Profile</a>}
            />
        </Modal>}
        {cancel && <Modal>
            <Dialog text={'Cancelling Adding Quiz Questions'} />
        </Modal>}
        <div className={classes.progress}></div>
        <p className={classes.questionNumber}>
            {totalQuizzes >= 1 ? `5 Quizzes already added` : `Question ${totalQuizzes + 1}/5`}
        </p>
        <form className={classes.form} method="post" onSubmit={submitHandler} action="/quiz/add-quiz">
            {!quizAction.question ?
                <header onClick={() => setQuizAction(prev => ({ ...prev, question: true }))}>
                    <IoIosAddCircleOutline className={classes.addQuestion} />
                    <p>Add Question</p>
                </header> :
                <textarea className={classes.question} required name="question" placeholder="What is the best quiz app you know ?" />
            }
            <div className={classes.option}>
                {quizAction.option1 === false ?
                    <header onClick={() => handleOptions(1)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 1</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 1} onChange={() => setSelected(1)} />
                        <input type="text" name="answer1" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(1)}> Delete</p>
                    </figure>
                }
                {quizAction.option2 === false ?
                    <header onClick={() => handleOptions(2)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 2</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 2} onChange={() => setSelected(2)} />
                        <input type="text" name="answer2" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(2)}>Delete</p>
                    </figure>
                }
                {quizAction.option3 === false ?
                    <header onClick={() => handleOptions(3)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 3</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 3} onChange={() => setSelected(3)} />
                        <input type="text" name="answer3" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(3)}>Delete</p>
                    </figure>
                }
                {quizAction.option4 === false ?
                    <header onClick={() => handleOptions(4)}>
                        <IoIosAddCircleOutline className={classes.addQuestion} />
                        <p>Answer 4</p>
                    </header> :
                    <figure>
                        <input type="checkbox" checked={selected === 4} onChange={() => setSelected(4)} />
                        <input type="text" name="answer4" placeholder="Answer" />
                        <p className={classes.cross} onClick={() => handleDelete(4)}>Delete</p>
                    </figure>
                }
            </div>
            <div className={classes.controls}>
                <button className={classes.cancelButton} onClick={() => { setCancel(true) }}>
                    <span>Cancel</span>
                </button>
                <button className={classes.saveButton} type="submit">
                    <span>Save</span>
                </button>
            </div>
        </form>
    </section >
}

export default AddQuiz;