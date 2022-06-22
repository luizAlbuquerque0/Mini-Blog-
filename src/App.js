import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//Context
import { AuthProvider } from './context/AuthContext';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAutenthication';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { onAuthStateChanged } from 'firebase/auth';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashnoard from './pages/Dashboard/Dashnoard';
import Search from './pages/Search/Search';


function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About/>} />
              <Route path='/search' element={<Search/>} />
              <Route path='/login' element={!user? <Login/> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register/> : <Navigate to="/" />} />
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to="/login" />}/>
              <Route path='/dashboard' element={user ? <Dashnoard/> : <Navigate to="/login" /> }/>
            </Routes>
          </div>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
