import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../controllers/redux/authSlice';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onButton = (event) => {
        dispatch(logOut());
        event.preventDefault();
        navigate('/login')
    }
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <button type='submit' onClick={onButton}>LogOut</button>
        </div>
    )
}

export default DashboardPage;