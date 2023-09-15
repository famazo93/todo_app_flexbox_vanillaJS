import {useState} from 'react';

function LoginForm() {
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongUsername, setWrongUsername] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const {username, password} = event.target;
        const userToCheck = {
            userToCheck: {
                username: username.value,
                password: password.value
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
        const {status, msg, wrong} = await response.json();
        if (status) {
            console.log(msg);
        } else if (wrong === 'password') {
            setWrongPassword(true);
        } else if (wrong === 'username') {
            setWrongUsername(true);
        } else {
            console.log('Something went wrong...')
        }
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
                <form action="" onSubmit={handleLogin}>
                    <div className="form-group">
                            <input onClick={resetCredentialsCheck} type="text" className="form-control" name="username" placeholder='Username' required />
                            {wrongUsername ? <span className='login-error'>User not found!</span> : null}
                    </div>
                    <div className="form-group">
                            <input onClick={resetCredentialsCheck} type="password" className="form-control" name="password" placeholder='Password' required />
                            {wrongPassword ? <span className='login-error'>Incorrect password!</span> : null}
                    </div>
                    <button type='submit' className='signup-button'>Sign In</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm;