import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../controllers/redux/authSlice';
import { useNavigate } from 'react-router-dom';

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
        <div className='login-page'>
            <form className='login-form'>
                <h2>SignUp</h2>
                <input name='name' className='login-name' placeholder='Name' onChange={onInputChange} value={formInput.name}></input>
                <input name='password' className='login-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password}></input>
                <button type='submit' onClick={onSubmit}>SignUp</button>
            </form>
        </div>
    )
};


export default SignUpPage;
