function SignupForm(props) {
    const {setSubmitted} = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {email, username, password} = event.target;
        const newUser = {
            email: email.value,
            username: username.value,
            password: password.value
        };

        await fetch('/api/login/newUser', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        });

        setSubmitted(true);
    }

    return (
        <>
            <div className='signup-title'>Your first time here?</div>
            <div className='signup-message'>Please use your email and select a username/password combination to create a new account.</div>
            <div className='signup-form'>
                <form action="/login/newUser" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <input type="text" className="form-control" name="email" placeholder='Email' required />
                    </div>
                    <div className="form-group">
                            <input type="text" className="form-control" name="username" placeholder='Username' required />
                    </div>
                    <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder='Password' required />
                    </div>
                    <button type='submit' className='signup-button'>CREATE ACCOUNT</button>
                </form>
            </div>
        </>
    )
}

export default SignupForm;