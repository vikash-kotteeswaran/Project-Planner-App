import './App.css';
import LoginPage from './views/login/loginPage';
import SignUpPage from './views/signup/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MyProjects from './views/dashboard/myProjects/myProjects';
import ProjectTab from './views/dashboard/projectTab/projectTab';
import TaskTab from './views/dashboard/taskTab/taskTab';
import AllProjects from './views/dashboard/allProjects/allProjects';
import AllTasks from './views/dashboard/allTasks/allTasks';

function App() {

  const auth = useSelector(state => state.auth);
  // console.log("App: ", auth);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={auth.loggedIn ? <Navigate to='/myProjects' /> : <Navigate to='/login' />}></Route>
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route exact path='/myProjects' element={auth.loggedIn ? <MyProjects /> : <Navigate to='/login' />}></Route>
          <Route exact path='/otherProjects' element={auth.loggedIn ? <AllProjects /> : <Navigate to='/login' />}></Route>
          <Route exact path='/otherTasks' element={auth.loggedIn ? <AllTasks /> : <Navigate to='/login' />}></Route>
          <Route exact path='/stats' element={auth.loggedIn ? <></> : <Navigate to='/login' />}></Route>
          <Route exact path='/profile' element={auth.loggedIn ? <></> : <Navigate to='/login' />}></Route>
          <Route exact path='/settings' element={auth.loggedIn ? <></> : <Navigate to='/login' />}></Route>
          <Route exact path='/signup' element={<SignUpPage />}></Route>

          <Route exact path='/project/:projectId' element={auth.loggedIn ? <ProjectTab /> : <Navigate to='/login' />}></Route>
          <Route exact path='/task/:taskId' element={auth.loggedIn ? <TaskTab /> : <Navigate to='/login' />}></Route>
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;
