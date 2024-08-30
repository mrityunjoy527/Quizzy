import { useEffect, useState } from "react";
import useFirebaseUser from "../../useFirebaseUser";
import classes from "./Profile.module.css";
import { MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
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
        setAskedQuiz,
    } = useFirebaseUser();
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const [quizzes, setQuizzes] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteQuizId, setDeleteQuizId] = useState();

    if (!user) navigate("/login", { replace: true });

    useEffect(() => {

        fetchFirebaseUser(user);

    }, [user, fetchFirebaseUser, name]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const quizzesFromFirestore = [];
            try {
                askedQuiz.forEach(async quizId => {
                    const ref = doc(db, "quizzes", quizId);
                    const snapShot = await getDoc(ref);
                    if (snapShot.exists()) {
                        const quiz = snapShot.data();
                        const quizDesc = { quizId, questions: quiz.quizzes };
                        quizzesFromFirestore.push(quizDesc);
                    }
                });
                setQuizzes(quizzesFromFirestore);
            } catch (e) {
                console.log(e);
            }
        }
        fetchQuizzes();

    }, [name, askedQuiz]);


    async function deleteHandler() {
        if (deleteQuizId) {
            try {
                await deleteDoc(doc(db, "quizzes", deleteQuizId));
                const newAskedQuiz = askedQuiz.filter(quizId => quizId !== deleteQuizId);
                setAskedQuiz(newAskedQuiz);
            } catch (err) {
                console.log(err);
            }
        }
        setShowDialog(false);
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
                    second={<button>Cancel</button>}
                />
            </Modal>}
            <img src="./wonder.png" alt="" />
            {quizzes.length === 0 && <h2>No Quizzes Asked Yet... {quizzes.length}</h2>}
            {quizzes.map((quizDesc) => (
                <figure key={quizDesc.quizId} className={classes.quizzes}>
                    {quizDesc.questions.map((q) => (<p key={quizDesc.quizId}>{q?.question}</p>))}
                    <MdDelete className={classes.deleteQuiz} onClick={() => { setDeleteQuizId(quizDesc.quizId); setShowDialog(true); }} />
                </figure>
            ))}
        </article>
    </section>;
}

export default Profile;