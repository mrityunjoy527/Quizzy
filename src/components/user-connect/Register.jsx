import { useState } from 'react';
import "./register.css";
import useRegister from '../../useRegister';
import { Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {toggleRegister} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    return (
        <div className='login'>
            <h2>Create your account on Quzzy!</h2>
            <p className='subHead'>Sign Up to ASK and ANSWER quizzes</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name*</label>
                <input id='name' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                <label htmlFor="email">Email*</label>
                <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <label htmlFor="password">Password*</label>
                <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
                <button type="submit">Get Started</button>
            </form>

            <p>Already have an account?
                <Link to='/login' onClick={() => toggleRegister()}>Sign In</Link>
            </p>

        </div>
    );
}

export default Register;
