import React, { useEffect, useState } from 'react';
import './styles/_index.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { RegisterUser } from './components/auth/AuthInterfaces';
import { logout } from './components/auth/firebase-auth';
import { useNavigate } from 'react-router-dom';
import WishList from './components/wishlist/WishList';

function App() {
  
  const [user, setUser] = useState<RegisterUser>({name: '', password: '', email: ''})
  let navigate = useNavigate();

  useEffect( () => {
    // myUser()
  }, [])
 
  function myUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setUser({name: currentUser.displayName || '', email: currentUser?.email || '', password: 'x'})
        console.log(currentUser)
      } else {
        // User is signed out
        console.log('no one logged in')
        navigate('/login')
      }
    });
  }

  function logOut() {
    logout();
  }


  return (
    <div className="App">
      <button onClick={myUser}>my user</button>
      <button onClick={logOut}>Log Out</button>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/wishlist/:id' element={<WishList/>} />
      </Routes>
    </div>
  );
}

export default App;
