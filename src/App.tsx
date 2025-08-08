import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HealthProfile from './pages/HealthProfile';
import SymptomChecker from './pages/SymptomChecker';
import HealthcareFinder from './pages/HealthcareFinder';
import HealthTracker from './pages/HealthTracker';
import Insights from './pages/Insights';
import { User, HealthData } from './types';
import Chatbot from "./pages/Chatbot";




function App() {
  const [user, setUser] = useState<User | null>(null);
  const [healthData, setHealthData] = useState<HealthData[]>([]);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('healthcarePlatformUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load health data
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('healthcarePlatformUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcarePlatformUser');
  };

  const updateHealthData = (newData: HealthData) => {
    const updated = [...healthData, newData];
    setHealthData(updated);
    localStorage.setItem('healthData', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {user && <Navbar user={user} onLogout={logout} />}
        
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/dashboard" /> : <LandingPage />
          } />
          
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />
          } />
          
          <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : <Register onRegister={login} />
          } />

          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} healthData={healthData} />} />
              <Route path="/profile" element={<HealthProfile user={user} />} />
              <Route path="/symptoms" element={<SymptomChecker user={user} />} />
              <Route path="/finder" element={<HealthcareFinder />} />
              <Route path="/tracker" element={<HealthTracker onUpdateHealth={updateHealthData} />} />
              <Route path="/insights" element={<Insights user={user} healthData={healthData} />} />
              <Route path="/chatbot" element={<Chatbot />} />
            

            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;