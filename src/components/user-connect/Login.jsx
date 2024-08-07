import { useState } from 'react';
import  useRegister from '../../useRegister';
import "./register.css";
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toggleRegister } = useRegister();


  return (
    <div className='login'>
      <h2>Welcome back!</h2>
      <p className='subHead'>Sign In to ASK and ANSWER quizzes</p>
      <form >
        <label htmlFor="email">Email*</label>
        <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <label htmlFor="password">Password*</label>
        <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
        <p>Forgot password?</p>
        <button type="submit">Sign In</button>
      </form>


      <p>{"Don't have an account?"}
        <Link to='/register' onClick={() => toggleRegister()}>Sign Up</Link>
      </p>

    </div>
  );
}

export default Login;
