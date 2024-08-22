import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import AllTasks from './pages/AllTasks';
import { useSelector, useDispatch } from 'react-redux';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Spinner from './components/Spinner';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';


const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);



  const { loading } = useSelector(state => state.alerts)


  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
        <ToastContainer />
        {loading ? (
          <Spinner />
        ) : (
          < Routes >
            <Route path='/' element={
              <PublicRoutes>
                <LandingPage />
              </PublicRoutes>
            } />
            <Route path='/login' element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            } />
            <Route path='/signup' element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            } />
            <Route path='/dashboard' element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            } />
            <Route path='/addTask' element={
              <ProtectedRoutes>
                <AddTask />
              </ProtectedRoutes>
            } />
            <Route path='/allTasks' element={
              <ProtectedRoutes>
                <AllTasks />
              </ProtectedRoutes>
            } />
            <Route path='/profile' element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            } />
          </Routes>
        )}
      </BrowserRouter >
    </div>

  )
}

export default App