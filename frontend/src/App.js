import './App.css';
import LoginPage from './views/login/loginPage';
import DashboardPage from './views/dashboard/dashboardPage';
import SignUpPage from './views/signup/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function App() {

  const auth = useSelector(state => state.auth);
  // console.log("App: ", auth);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={auth.loggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/login' />}></Route>
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route exact path='/dashboard' element={auth.loggedIn ? <DashboardPage /> : <Navigate to='/login' />}></Route>
          <Route exact path='/signup' element={<SignUpPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;