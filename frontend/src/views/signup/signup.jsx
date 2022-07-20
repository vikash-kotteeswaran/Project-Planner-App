import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, addUser } from '../../controllers/redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
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
        if(verifyInput.num1 + verifyInput.num2 == verifyInput.verify){
            dispatch(addUser(formInput));
        }
    }

    const handleKeyPress = (event) => {
        if(event.key == 'enter'){
            onSubmit(event);
        }
    }

    return(
        <div className='signup-page'>
            <form className='signup-form'>
                <h2>SignUp</h2>
                <input name='name' className='signup-name' placeholder='Name' onChange={onInputChange} value={formInput.name}></input>
                <input name='password' className='signup-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password}></input>
                <input name='verify' className='signup-verify' placeholder={`${verifyInput.num1} + ${verifyInput.num2}`} onChange={onInputChange} value={verifyInput.verify}></input>
                {auth.signedUp?<span className='signup-signedup'>Successfully signed up</span> : <></>}
                <button className='signup-button' type='submit' onClick={onSubmit} onKeyPress = {onSubmit}><span>SignUp</span></button>
                <span className='signup-link'>Already have an account? <Link to="/login">login</Link></span>
            </form>
        </div>
    )
};


export default SignUpPage;
