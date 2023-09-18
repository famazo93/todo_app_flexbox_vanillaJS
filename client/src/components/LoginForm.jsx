import {useState} from 'react';
import Cookies from 'js-cookie';

function LoginForm() {
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongUsername, setWrongUsername] = useState(false);
    let usernameInput = null;
    let passwordInput = null;

    const handleLogin = async () => {
        const userToCheck = {
            userToCheck: {
                username: usernameInput,
                password: passwordInput
            }
        };

        const response = await fetch('http://localhost:3000/authentication', {
            method: "POST",
            body: JSON.stringify(userToCheck),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        });
        const {status, wrong} = await response.json();
        if (status) {
            Cookies.set('authenticated', true, {expires: 1000 * 60 * 60 * 24});
            Cookies.set('user', userToCheck.username, {expires: 1000 * 60 * 60 * 24})
            window.location = 'http://localhost:5173/'
        } else if (wrong === 'password') {
            setWrongPassword(true);
        } else if (wrong === 'username') {
            setWrongUsername(true);
        } else {
            console.log('Something went wrong...')
        }
    }

    const handleUsernameInput = event => {
        usernameInput = event.target.value;
    };

    const handlePasswordInput = event => {
        passwordInput = event.target.value;
    }

    const resetCredentialsCheck = () => {
        setWrongPassword(false);
        setWrongUsername(false);
    }

    return (
        <>
            <div className='signup-title'>It is great to have you back.</div>
            <div className='signup-message'>Please enter your username and password.</div>
            <div className='signup-form'>
                <form action="">
                    <div className="form-group">
                            <input onChange={handleUsernameInput} onClick={resetCredentialsCheck} type="text" className="form-control" name="username" placeholder='Username' required />
                            {wrongUsername ? <span className='login-error'>User not found!</span> : null}
                    </div>
                    <div className="form-group">
                            <input onChange={handlePasswordInput} onClick={resetCredentialsCheck} type="password" className="form-control" name="password" placeholder='Password' required />
                            {wrongPassword ? <span className='login-error'>Incorrect password!</span> : null}
                    </div>
                    <button type='button' onClick={handleLogin} className='signup-button'>Sign In</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm;