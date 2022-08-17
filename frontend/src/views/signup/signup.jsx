import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../controllers/redux/authSlice';
import { Link } from 'react-router-dom';
import './signup.css';

const SignUpPage = () => {
    const [formInput, setFormInput] = useState({
        name:"",
        password:""
    });

    const [verifyInput, setVerifyInput] = useState({
        num1: Math.floor(Math.random()*100),
        num2: Math.floor(Math.random()*100),
        verify: ""
    });

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const onInputChange = (event) => {

        if(event.target.name == 'verify'){
            setVerifyInput({
                ...verifyInput,
                [event.target.name]: event.target.value
            });
        } else{
            setFormInput({
                ...formInput,
                [event.target.name]: event.target.value
            });
        };
    }

    const onSubmit = (event) => {
        event.preventDefault();

        let inputCheck = true;

        if(formInput.name.length == 0) {
            inputCheck = false;
            document.querySelector('input.signup-name').className = 'signup-name fail'

            setTimeout(() => {
                document.querySelector('input.signup-name').className = 'signup-name'
            }, 5000)
        } else {
            inputCheck = true;
        }

        if(formInput.password.length < 8) {
            inputCheck = false;

            // Adopt this method of using a single dom object for everything
            const signupPassword = document.querySelector('input.signup-password');
            signupPassword.className = 'signup-password fail'
            signupPassword.placeholder = 'atleast 8 characters long'

            setTimeout(() => {
                signupPassword.className = 'signup-password'
                signupPassword.placeholder = 'Password'
            }, 5000)
        } else {
            inputCheck = true;
        }

        if(verifyInput.num1 + verifyInput.num2 == verifyInput.verify){
            if(inputCheck) dispatch(addUser(formInput));
        } else {
            document.querySelector('input.signup-verify').className = 'signup-verify fail'

            setTimeout(() => {
                document.querySelector('input.signup-verify').className = 'signup-verify'
            }, 5000)
        }
    }

    return(
        <div className='signup-page'>
            {
            auth.loading? 
            <div className='signup-loading'>
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> : 
            <></>
            }
            <form className='signup-form'>
                <h2>SignUp</h2>
                <input name='name' className='signup-name' placeholder='Name' onChange={onInputChange} value={formInput.name}></input>
                <input name='password' className='signup-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password}></input>
                <input name='verify' className='signup-verify' placeholder={`${verifyInput.num1} + ${verifyInput.num2}`} onChange={onInputChange} value={verifyInput.verify}></input>
                {auth.signedUp?<span className='signup-signedup'>Successfully signed up</span> : <></>}
                {auth.failure? <span className='signup-failure'>User already exists</span> : <></>}
                <button className='signup-button' type='submit' onClick={onSubmit} onKeyPress = {onSubmit}><span>SignUp</span></button>
                <span className='signup-link'>Have an account? <Link to="/login">login</Link></span>
            </form>
        </div>
    )
};


export default SignUpPage;
