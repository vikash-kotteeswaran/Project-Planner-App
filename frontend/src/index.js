import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice  from './controllers/redux/authSlice';
import myProjectSlice from './controllers/redux/myProjectSlice';
import allProjectSlice from './controllers/redux/allProjectSlice';
import allTaskSlice from './controllers/redux/allTaskSlice';

const reducer = combineReducers({
  auth: authSlice,
  myProject: myProjectSlice,
  allProjects: allProjectSlice,
  allTasks: allTaskSlice
});

const store = configureStore({reducer});

document.querySelector('title').innerHTML = 'Project Planner';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
