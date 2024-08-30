
import useRegister from '../../useRegister';
import classes from "./Register.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,} from '../../firebase/configuration';
import Progress from '../progress/Progress';
import { useState } from 'react';
import useFirebaseUser from "../../useFirebaseUser";


function Login() {

  const { toggleRegister } = useRegister();
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();
  const { fetchFirebaseUser } = useFirebaseUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      await fetchFirebaseUser(uid);
      localStorage.setItem("user", uid);
      navigate("/", { replace: true });
    } catch (e) {
      console.err(e);
    } finally {
      setShowProgress(false);
    }
  }

  return (
    <div className={classes.login}>
      <h2>Welcome back!</h2>
      <p className={classes.subHead}>Sign In to ASK and ANSWER quizzes</p>
      <form method='post' action='/login' onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
        <input id='email' type="email" name='email' placeholder="Enter your email" required />
        <label htmlFor="password">Password*</label>
        <input id='password' type="password" name="password" placeholder="Create a password" required />
        <p>Forgot password?</p>
        <button disabled={showProgress}>{showProgress ? <Progress /> : "Sign In"}</button>
      </form>


      <p>{"Don't have an account?"}
        <Link to='/register' onClick={() => toggleRegister()}>Sign Up</Link>
      </p>

    </div>
  );
}

export default Login;