import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import AdminPanel from './components/AdminPanel';
function RouterContent() {
  const location = useLocation();
  return (
    <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    </main>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}

export default Router;
