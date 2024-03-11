import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AddSongs from './routes/AddSongs';
import Search from './routes/Search';
import LikedSongs from './routes/LikedSongs';
import Library from './routes/Library';

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
        <Routes>
          
          <Route path='/home' element={token?<Home setToken={setToken} /> :<Navigate to='/login' />} />
          <Route path='/likedsongs' element={token?<LikedSongs /> :<Navigate to='/login' />} />
          <Route path='/library' element={token?<Library /> :<Navigate to='/login' />} />
          
          <Route path='*' element={token?<Navigate to='/home' />:<Navigate to='/login'/>} />
          <Route path='/login' element={token?<Navigate to='/home'/>:<Login setToken={setToken}/>} />
          <Route path='/signup' element={token?<Navigate to='/home'/>:<SignUp setToken={setToken}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
