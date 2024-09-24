import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../src/pages/dashboard/dashboard';
import Forum from './components/forum/forum.component';
import Login from './pages/login/login.component';
import './index.css';

function RouteFunction() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/foro" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

// Renderizamos la aplicación
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouteFunction />
    </StrictMode>
  );
}
