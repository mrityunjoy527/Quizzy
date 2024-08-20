import classes from "./Register.module.css";
import useRegister from '../../useRegister';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase/configuration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFirebaseUser from "../../useFirebaseUser";
import Progress from "../progress/Progress";
import { useState } from "react";

function Register() {
    const navigate = useNavigate();
    const { toggleRegister } = useRegister();
    const { setFirebaseUser } = useFirebaseUser();
    const [registering, setRegistering] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setRegistering(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const { name, email, password } = data;
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const uid = res.user.uid;
            setFirebaseUser({ uid, name, email });
            navigate("/edit-profile", { replace: false });
        } catch (e) {
            console.log(e);
        } finally {
            setRegistering(false);
        }
    }

    return (
        <div className={classes.login}>
            <h2>Create your account on Quizzy!</h2>
            <p className={classes.subHead}>Sign Up to ASK and ANSWER quizzes</p>
            <form method="post" onSubmit={submitHandler} action="/register">
                <label htmlFor="name">Name*</label>
                <input id='name' type="text" name="name" placeholder="Enter your name" required />
                <label htmlFor="email">Email*</label>
                <input id='email' type="email" name="email" placeholder="Enter your email" required />
                <label htmlFor="password">Password*</label>
                <input id='password' type="password" name="password" placeholder="Create a password" required />
                <button>
                    {registering ? <Progress /> : "Sign Up"}
                </button>
            </form>
            <p>Already have an account?
                <Link to='/login' onClick={() => toggleRegister()}>Sign In</Link>
            </p>
        </div>
    );
}

export default Register;