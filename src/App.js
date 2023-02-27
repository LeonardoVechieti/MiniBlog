import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//context
import { AuthProvider, useAuthValue } from './context/AuthContext';
//para o firebase
import { onAuthStateChanged } from 'firebase/auth';


//importa os hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Posts from './pages/Posts/Posts';

//components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';





function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <div>Carregando...</div>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              {/* rotas publicas */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search/>} />
              <Route path="/posts/:id" element={<Posts/>} />
              {/* Rotas privadas */}
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              {/* Pagina 404 */}
              <Route path="*" element={<Navigate to="/" />} />
              
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
