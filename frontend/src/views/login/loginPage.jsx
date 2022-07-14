import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { failure_span, logIn, Authenticate } from '../../controllers/redux/authSlice';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import "./loginPage.css";

const LoginPage = () => {
    const [formInput, setFormInput] = useState({
        name:"",
        password:""
    });

    let auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value
        })
        if(auth.failure) dispatch(failure_span({failure: false}));
    }

    const onSubmit = (event) => {
        dispatch(Authenticate(formInput));
        event.preventDefault();
    }

    useEffect(() => {
        if(auth.authorized) dispatch(logIn());
        if(auth.LoggedIn) navigate('/dashboard');
    }, [auth.LoggedIn, auth.authorized]);

    return(
        <div className='login-page'>
            <form className='login-form'>
                <h2>LOGIN</h2>
                <input name='name' className='login-name' placeholder='Name' onChange={onInputChange} value={formInput.name}></input>
                <input name='password' className='login-password' type='password' placeholder='Password' onChange={onInputChange} value={formInput.password}></input>
                <button className = 'login-button' type='submit' onClick={onSubmit}><span>Login</span></button>
                {auth.failure? <span className='login-failure'>This account does not exist</span> : <></>}
                <span className='signup-link'>Create an account? <Link to="/signup">signUp</Link></span>
            </form>
            
        </div>
    )
};


export default LoginPage;
