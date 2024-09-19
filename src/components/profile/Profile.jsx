import { useEffect, useState } from "react";
import useFirebaseUser from "../../useFirebaseUser";
import classes from "./Profile.module.css";
import { MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/configuration";
import { FaArrowLeft } from "react-icons/fa";
import Dialog from "../Dialog/Dialog";
import Modal from "../Modal/Modal";

const Profile = () => {

    const {
        imgUrl,
        name,
        age,
        designation,
        feedback,
        takenQuiz,
        askedQuiz,
        fetchFirebaseUser,
    } = useFirebaseUser();
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const [quizzes, setQuizzes] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteQuizId, setDeleteQuizId] = useState();

    if (!user) navigate("/login", { replace: true });

    useEffect(() => {

        fetchFirebaseUser(user);

    }, [fetchFirebaseUser, user]);


    useEffect(() => {

        const fetchQuizzes = async function () {
            try {
                askedQuiz.forEach(async quizId => {
                    const ref = doc(db, "quizzes", quizId);
                    const snapShot = await getDoc(ref);
                    if (snapShot.exists()) {
                        const quiz = snapShot.data();
                        const quizDesc = { quizId, questions: quiz.quizzes };
                        setQuizzes(prev => [...prev, quizDesc]);
                    }
                });
            } catch (e) {
                console.log(e);
            }

            console.log("fetched");
        }

        fetchQuizzes();

    }, [askedQuiz]);


    async function deleteHandler() {
        if (deleteQuizId) {
            try {
                const newQuizzes = quizzes.filter(quiz => quiz.quizId !== deleteQuizId);
                const newQuizIDs = newQuizzes.map(quiz => quiz.quizId);
                await deleteDoc(doc(db, "quizzes", deleteQuizId));
                await updateDoc(doc(db, "users", user), { askedQuiz: newQuizIDs });
                setShowDialog(false);
                setQuizzes(newQuizzes);
            } catch (err) {
                console.log(err);
                setShowDialog(false);
            } finally {
                setDeleteQuizId();
            }
        }
    }

    return <section className={classes.profile}>
        <Link to="/" className={classes.backArrow} ><FaArrowLeft /></Link>
        <article className={classes.user}>
            <img src={imgUrl || "./avatar.png"} alt="" />
            <h2 className={classes.username}>{name?.slice(0, 1).toUpperCase() + name?.slice(1) || "Username"}</h2>
            <p className={classes.userBio}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dicta? Facere, perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ea.
            </p>
            <figure className={classes.information}>
                <p><span>Designation</span> : {designation} </p>
                <p><span>Age</span> : {age} </p>
                <p><span>Quizzes Asked</span> : {askedQuiz.length} </p>
                <p><span>Quizzes Taken</span> : {takenQuiz.length} </p>
                <p><span>Feedback</span> : {feedback} ⭐</p>
            </figure>
            <Link to="/quiz/add-quiz">Add Quiz</Link>
        </article>
        <article className={classes.askedQuizzes}
            style={{
                display: quizzes.length === 0 && "flex",
                alignItems: quizzes.length === 0 && "center",
                justifyContent: quizzes.length === 0 && "center",
            }}>
            {showDialog && <Modal>
                <Dialog text={'You really want to delete this quiz?'}
                    first={<button onClick={deleteHandler}>Yes</button>}
                    second={<button onClick={() => { setShowDialog(false); }}>Cancel</button>}
                />
            </Modal>}
            <img src="./wonder.png" alt="" />
            {quizzes.length === 0 && <h2>No Quizzes Asked Yet...</h2>}
            {quizzes.map((quizDesc, idx) => (
                <figure key={`${quizDesc.quizId}${idx}`} className={classes.quizzes}>
                    {quizDesc.questions.map((quiz, id) => (
                        <p key={`${quizDesc.quizId}${id}`}>{quiz.question}</p>
                    ))}
                    <MdDelete className={classes.deleteQuiz}
                        onClick={() => {
                            setDeleteQuizId(quizDesc.quizId);
                            setShowDialog(true);
                        }}
                    />
                </figure>
            ))}
        </article>
    </section>
}

export default Profile;