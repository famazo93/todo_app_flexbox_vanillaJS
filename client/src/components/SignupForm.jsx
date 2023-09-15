function SignupForm(props) {
    const {handleSubmit} = props;

    return (
        <>
            <div className='signup-title'>Your first time here?</div>
            <div className='signup-message'>Please use your email and select a username/password combination to create a new account.</div>
            <div className='signup-form'>
                <form action="http://localhost:3000/login/newUser" method="POST" onSubmit={handleSubmit}>
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