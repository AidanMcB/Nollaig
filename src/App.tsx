import { useEffect, useState } from 'react';
import './styles/_index.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from './components/auth/firebase-auth';
import { useNavigate } from 'react-router-dom';
import WishList from './components/wishlist/WishList';
import Navbar from './components/navbar/Navbar';

function App() {
  
  const [user, setUser] = useState<any>({name: '', password: '', email: '', id: ''})
  let navigate = useNavigate();
  const location = useLocation();

  useEffect( () => {
    myUser()
  }, [])
 
  function myUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setUser({ name: currentUser.displayName || '', 
          email: currentUser?.email || '', 
          password: 'x',
          id: uid,
        });
        navigate(`/wishlist/${currentUser.uid}`);
      } else {
        // User is signed out
        setUser({name: '', password: '', email: '', id: ''});
        if(location.pathname != '/register'){
          navigate('/login')
        }
      }
    });
  }

  function logOut() {
    logout();
  }

  return (
    <div className="App">
      <Navbar user={user} logOut={logOut}/>
      <button onClick={myUser}>my user</button>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/wishlist/:id' element={<WishList user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
