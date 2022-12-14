import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);


    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        // validation
        if (password.length < 6) {
            setError("Password should be 6 characters or more");
            return;
        }
        if (password !== confirm) {
            setError("Your password didn't match");
            return;
        }

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => console.log("error:", error));
    }

    return (
        <div>
           <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id='email' required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id='password' required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id='confirm' required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className=''>Already have an account? <Link to="/login">Sign up</Link></p>
            <p className="text-error">{error}</p>
        </div> 
        </div>
    );
};

export default SignUp;