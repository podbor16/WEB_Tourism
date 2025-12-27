import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { userAPI, initializeCSRF } from './api';
import './App.css';

// Компоненты
import Header from './components/Header';
import Home from './pages/Home';
import TourList from './pages/TourList';
import TourDetail from './pages/TourDetail';
import RouteDetail from './pages/RouteDetail';
import TourismTypePage from './pages/TourismTypePage';
import Media from './pages/Media';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import MyRegistrations from './pages/MyRegistrations';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminTours from './pages/AdminTours';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Инициализируем CSRF токен и проверяем авторизацию
    const checkAuth = async () => {
      try {
        // Сначала получаем CSRF токен (это инициализирует сессию)
        await initializeCSRF();
        
        // Потом проверяем авторизацию
        const response = await userAPI.getMe();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/tourism/:type" element={<TourismTypePage />} />
            <Route path="/tours" element={<TourList />} />
            <Route path="/tours/:id" element={<RouteDetail user={user} />} />
            <Route path="/routes/:id" element={<RouteDetail user={user} />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register setUser={setUser} />} />
            
            {/* Защищенные маршруты */}
            <Route 
              path="/profile" 
              element={<PrivateRoute user={user}><Profile user={user} setUser={setUser} /></PrivateRoute>} 
            />
            <Route 
              path="/my-registrations" 
              element={<PrivateRoute user={user}><MyRegistrations user={user} /></PrivateRoute>} 
            />
            <Route 
              path="/admin/tours" 
              element={<PrivateRoute user={user}><AdminTours /></PrivateRoute>} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

