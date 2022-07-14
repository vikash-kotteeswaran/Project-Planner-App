import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../controllers/redux/authSlice';
import { useNavigate } from 'react-router-dom';

import "./signup.css"

const SignUpPage = () => {
    const [formInput, setFormInput] = useState({
        name:"",
        password:""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        dispatch(signUp(formInput));
        event.preventDefault();
        // console.log(formInput);
        navigate('/login');
    }

    return(
        <div className='signup-page'>
            <form className='signup-form'>
                <h2>SignUp</h2>
                <input name='name' className='signup-name' placeholder='Name' onChange={onInputChange} value={formInput.name}></input>
                <input name='password' className='signup-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password}></input>
                <button className='signup-button' type='submit' onClick={onSubmit}><span>SignUp</span></button>
            </form>
        </div>
    )
};


export default SignUpPage;
