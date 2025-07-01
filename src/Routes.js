import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feature1 from './pages/Feature1';
import Feature2 from './pages/Feature2';
import Feature3 from './pages/Feature3';
import Feature4 from './pages/Feature4';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Feature1 />} />
      <Route path="/quiz-generation" element={<Feature2 />} />
      <Route path="/lecture-preparation" element={<Feature3 />} />
      <Route path="/history" element={<Feature4 />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
