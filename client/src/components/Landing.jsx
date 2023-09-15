import {useState} from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

function Landing() {
    const [submitted, setSubmitted] = useState(false);
    const [login, setLogin] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    }

    const handleLogin = () => {
        setLogin(true);
    }

    return (
        <div className='landing-container'>
            <div className='login-container'>
                <div className='login-box'>
                    <div className='login-title'>Welcome Back!</div>
                    
                    {!login ? (
                        <>
                            <div className='login-message'>To sign in with your username and password, please click the button below.</div>
                            <button onClick={handleLogin} className='login-button'>SIGN IN</button>
                        </>) : (<div className='login-message'>Please provide your username and password on the login page on the right.</div>)}
                </div>
            </div>
            <div className='signup-container'>
                <div className='signup-box'>
                    {login ? <LoginForm /> : !submitted ? <SignupForm handleSubmit={handleSubmit} /> : (
                            <div className='signup-title'>Thank you for registering! Now you can sign in.</div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Landing;