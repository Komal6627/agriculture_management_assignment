import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import PaymentPage from './components/dashboard/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/dashboard/payment"
          element={<ProtectedRoute element={<PaymentPage />} />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
