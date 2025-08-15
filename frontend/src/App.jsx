import { useState } from 'react'
import './App.css'
import toast, {Toaster} from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/Signuppage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <div>
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Signup' element={<SignupPage/>}/>        
        <Route path='/login' element={<LoginPage/>}/>        
        <Route path='/settings' element={<SettingsPage/>}/>        
        <Route path='/profile' element={<ProfilePage/>}/>        
      </Routes>

    </div>
  )
}

export default App
