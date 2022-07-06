import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../controllers/redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
        dispatch(logIn(formInput));
        event.preventDefault();
        // console.log(formInput);
        navigate('/dashboard');
    }

    return(
        <div className='login-page'>
            <form className='login-form'>
                <h2>Login</h2>
                <input name='name' className='login-name' placeholder='Name' onChange={onInputChange} value={formInput.name} required></input>
                <input name='password' className='login-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password} required></input>
                <button type='submit' onClick={onSubmit}>Login</button>
                <button type='submit' onClick={() => navigate('/signup')}>SignUp</button>
            </form>
        </div>
    )
};


export default LoginPage;
